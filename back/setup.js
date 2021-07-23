console.log('>> Iniciando Setup');
const config = require('./config');

const [db, type] = require('./database/database').get({
    type: config.db.type,
    host: config.db.host,
    port: config.db.port,
    name: config.db.name,
});

switch(type.toUpperCase()){
    case 'SQLITE3':
    default:
        db.setup();
}

console.log('>> Setup Finalizado\n');