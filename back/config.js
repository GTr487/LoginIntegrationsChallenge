module.exports = {
    app: {
        port: 8080,
    },
    db: {
        host: '',
        port: 0,
        name: 'db'
    },
    auth: {
        jwtKeyPath: 'private.key',
        jwtExpirySecond: 300,
        jwtRefreshTime: 60,
    }
}