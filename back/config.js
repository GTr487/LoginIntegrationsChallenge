const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

module.exports = {
    app: {
        port: env.APP_PORT || 8080,
    },
    db: {
        type: env.DB_TYPE || 'sqlite3',
        host: env.DB_HOST || './database/data.db',
        port: env.DB_PORT || 0,
        name: env.DB_NAME ||'db'
    },
    auth: {
        jwtSecret: env.TOKEN_SECRET || '0',
        jwtRefreshSecret: env.TOKEN_REFRESH_SECRET || '1',
        jwtExpirySecond: env.TOKEN_EXPIRATION || 1800,
        jwtRefreshTime: env.TOKEN_REFRESHTIME || 60,
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        }
    }
}