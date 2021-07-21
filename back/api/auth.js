const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const config = require('../config');

const privateKey = fs.readFileSync(config.auth.jwtKeyPath);
const router = express.Router();

router
    .post('/signin', (req, res) => {
        let { email, password } = req.body;

        if(!email || !password || !email.length || !password.length) return res.status(400).end();

        let token = jwt.sign({ email }, privateKey, {
            algorithm: "HS256",
            expiresIn: config.auth.jwtExpirySecond,
        });

        res.cookie("token", token, { 
            maxAge: config.auth.jwtExpirySecond * 1000, 
            httpOnly: true,
        });
        res.end();
    })

    .get('/login', (req, res) => {
        let payload;
        let token = req.cookies.token;
        if(!token) return res.status(401).end();
        try {
            payload = jwt.verify(token, privateKey);
        } catch (err) {
            if(e instanceof jwt.JsonWebTokenError) return res.status(401).end();    
            return res.status(400).end();
        }
        res.status(200).end();
    })

    .post('/refresh', (req, res) => {
        let payload;
        let token = req.cookies.token;
        if(!token) return res.status(401).end();
        try {
            payload = jwt.verify(token, privateKey);
        } catch (err) {
            if(e instanceof jwt.JsonWebTokenError) return res.status(401).end();    
            return res.status(400).end();
        }

        let nowSec = Math.round(Number(new Date()) / 1000);
        if(payload.exp - nowSec > config.auth.jwtRefreshTime) return res.status(400).end();

        let newToken = jwt.sign({ email: payload.email }, privateKey, {
            algorithm: "HS256",
            expiresIn: config.auth.jwtExpirySecond,
        });

        res.cookie("token", token, { 
            maxAge: config.auth.jwtExpirySecond * 1000, 
            httpOnly: true,
        });

        res.end();
    })

module.exports = router;