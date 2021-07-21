const config = require('./config');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const authRoutes = require('./api/auth'); 

app.use(express.json());
app.use(cookieParser());

app.listen(config.app.port, () => {
    console.log(`> Server listen on PORT: ${config.app.port} <`);
});

app.use('/auth', authRoutes);