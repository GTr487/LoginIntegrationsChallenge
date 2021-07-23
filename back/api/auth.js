const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const axios = require('axios');

const [db, type] = require('../database/database').get({
    type: config.db.type,
    host: config.db.host,
    port: config.db.port,
    name: config.db.name,
});

const router = express.Router();

router
    .post('/signin', async (req, res) => {
        try{
            let { email, password } = req.body;
    
            let user = await db.getUser(email, password);
            if(!user) return res.status(400).end();
    
            let token = generateAccessToken(email, config.auth.jwtSecret);
            let refreshToken = generateAccessToken(email, config.auth.jwtRefreshSecret);
    
            await db.setRefreshToken(email, refreshToken);
    
            res.cookie("refresh_token", refreshToken, { 
                maxAge: config.auth.jwtExpirySecond * 1000, 
                httpOnly: true,
            });
    
            res.json({token});
        } catch(err) {
            console.log(err);
            res.status(500).end();
        }
    })

    .post('/refresh', async (req, res) => {
        try{
            let payload;
            let cookieRefreshToken = req.cookies.refresh_token;
    
            if(!cookieRefreshToken) return res.status(401).end();
    
            try {
                payload = jwt.verify(cookieRefreshToken, config.auth.jwtRefreshSecret);
            } catch (err) {
                if(err instanceof jwt.JsonWebTokenError) return res.status(401).send(err);    
                return res.status(400).end();
            }
            let email = payload.email;
            
            let {refreshtoken: storeRefreshToken} = await db.getRefreshToken(email);
            if(cookieRefreshToken != storeRefreshToken) return res.status(401).end();
    
            let nowSec = Math.round(Number(new Date()) / 1000);
            // if(payload.exp - nowSec > config.auth.jwtRefreshTime) return res.status(400).end();
    
            let token = generateAccessToken(email, config.auth.jwtSecret);
            let newrefreshToken = generateAccessToken(email, config.auth.jwtRefreshSecret);
    
            await db.setRefreshToken(email, newrefreshToken);
    
            res.cookie("refresh_token", newrefreshToken, { 
                maxAge: config.auth.jwtExpirySecond * 1000, 
                httpOnly: true,
            });
    
            res.json({token});
        } catch(err) {
            console.log(err);
            res.status(500).end();
        }
    })

    .post('/signout', async (req, res) => {
        try{
            let payload;
            let refreshToken = req.cookies.refresh_token;
            if(!refreshToken) return res.status(401).end();
            try {
                payload = jwt.verify(refreshToken, config.auth.jwtRefreshSecret);
            } catch (err) {
                if(err instanceof jwt.JsonWebTokenError) return res.status(401).end();    
                return res.status(400).end();
            }
            
            await db.deleteRefreshToken(payload.email);
    
            res.cookie("refresh_token", "", { 
                maxAge: 0, 
                httpOnly: true,
            });
    
            res.end();
        } catch(err) {
            console.log(err);
            res.status(500).end();
        }
    })

    .get('/github/redirect', async (req, res) => {
        try{
            let code = req.query.code;
            let accessToken;
            let email;

            await axios({
                method: 'post',
                url: `https://github.com/login/oauth/access_token?client_id=${config.auth.github.clientId}&client_secret=${config.auth.github.clientSecret}&code=${code}`,
                headers: {
                    accept: 'application/json'
                }
            })
            .then(tokenResponse => {
                if(tokenResponse) accessToken = tokenResponse.data.access_token;
            });
        
            await axios({
                method: 'get',
                url: `https://api.github.com/user/emails`,
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    Authorization: 'token ' + accessToken
                }
            })
            .then(userResponse => userResponse.data)
            .then(userResponse => {
                if(userResponse.length > 0) email = userResponse[0].email;
            })

            let user = await db.existUser(email);
            if(!user) await db.addUser(email, Math.random());

            let refreshToken = generateAccessToken(email, config.auth.jwtRefreshSecret);

            await db.setRefreshToken(email, refreshToken);
    
            res.cookie("refresh_token", refreshToken, { 
                maxAge: config.auth.jwtExpirySecond * 1000, 
                httpOnly: true,
            }).redirect('http://localhost:3000/');
        } catch(err) {
            console.log(err);
            res.status(500).end();
        }
    })

    .get('/gmail/redirect', async (req, res) => {
        try{
            let code = req.query.code;
            const redirect_uri = encodeURIComponent("http://localhost:8080/auth/gmail/redirect");
            let accessToken;
            let email;

            await axios({
                method: 'post',
                url: `https://oauth2.googleapis.com/token`,
                data: `code=${code}&client_id=${config.auth.gmail.clientId}&client_secret=${config.auth.gmail.clientSecret}&redirect_uri=${redirect_uri}&grant_type=authorization_code&`,
                headers: {
                    accept: 'application/json'
                }
            })
            .then(tokenResponse => {
                if(tokenResponse) accessToken = tokenResponse.data.access_token;
            })
            .catch(err => console.log("ERR", err));
        
            await axios({
                method: 'get',
                url: `https://www.googleapis.com/oauth2/v2/userinfo`,
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    Authorization: 'Bearer ' + accessToken
                }
            })
            .then(userResponse => userResponse.data)
            .then(userResponse => {
                if(userResponse) email = userResponse.email;
            })

            let user = await db.existUser(email);
            if(!user) await db.addUser(email, Math.random());

            let refreshToken = generateAccessToken(email, config.auth.jwtRefreshSecret);

            await db.setRefreshToken(email, refreshToken);
    
            res.cookie("refresh_token", refreshToken, { 
                maxAge: config.auth.jwtExpirySecond * 1000, 
                httpOnly: true,
            })
            res.redirect('http://localhost:3000/');
        } catch(err) {
            console.log(err);
            res.status(500).end();
        }
    })


function generateAccessToken(email, secret) {
    return jwt.sign({ email }, secret, {
        algorithm: "HS256",
        expiresIn: Number(config.auth.jwtExpirySecond),
    });
}

module.exports = router;