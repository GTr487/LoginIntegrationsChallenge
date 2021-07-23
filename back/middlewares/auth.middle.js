const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res,  next) {
    let authHeader = req.headers.authorization;
    if(!authHeader) res.status(401).end();

    let token = authHeader.split(' ')[1];

    jwt.verify(token, config.auth.jwtSecret, (err, email)=> {
        if(err) res.status(403).end();

        req.email = email;
        next();
    });
}