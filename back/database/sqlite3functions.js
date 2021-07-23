const sqlite3 = require('sqlite3').verbose();

function getDatabase(filename) {
    return new sqlite3.Database(filename, err => {
        if(err) return console.error(err.message);
    });
}

module.exports = (filename) => {
    console.log(`SQLite3 Database - file: ${filename}`);

    return {
        setup: () => {
            let db = getDatabase(filename);
            db.serialize(()=> {
                console.log('- Configurando tablas');
                db.run(`CREATE TABLE IF NOT EXISTS ${tables.users.name}( \
                    ${tables.users.columns.id.name} integer PRIMARY KEY AUTOINCREMENT, \
                    ${tables.users.columns.email.name} text NOT NULL UNIQUE, \
                    ${tables.users.columns.password.name} text NOT NULL, \
                    ${tables.users.columns.refreshtoken.name} text)`)
                    console.log('- Configurando usuario de pruebas admin@admin.com:admin');
                    db.run(`INSERT OR REPLACE INTO ${tables.users.name}(${tables.users.columns.email.name}, ${tables.users.columns.password.name}) VALUES ("admin@admin.com", "admin")`)
                });
            db.close( err => (err) ? console.log(err.message) : null);
        },
            
        getUser: (email, password) => new Promise((res, rej) =>{
           let db = getDatabase(filename);
           db.get(`SELECT * FROM ${tables.users.name} \
                    WHERE ${tables.users.columns.email.name} = ? \
                    AND   ${tables.users.columns.password.name} = ?`, 
                    [email, password], 
                    (err, row) => {
                        if(err) return rej(err);
                        return res(row);
                    }
                );
            db.close( err => (err) ? rej(err.message) : null);
        }),

        existUser: (email) => new Promise((res, rej) =>{
           let db = getDatabase(filename);
           db.get(`SELECT * FROM ${tables.users.name} \
                    WHERE ${tables.users.columns.email.name} = ?`, 
                    [email], 
                    (err, row) => {
                        if(err) return rej(err);
                        return res(row);
                    }
                );
            db.close( err => (err) ? rej(err.message) : null);
        }),

        addUser: (email, password) => new Promise((res, rej) =>{
           let db = getDatabase(filename);
            db.run(`INSERT OR REPLACE INTO ${tables.users.name}( \
                    ${tables.users.columns.email.name}, \
                    ${tables.users.columns.password.name}) \
                VALUES ( ?, ?)`, [email, password]);
            db.close( err => (err) ? rej(err.message) : null);
        }),

        setRefreshToken: (email, token) => new Promise((res, rej) => {
            let db = getDatabase(filename);
            db.run(`UPDATE ${tables.users.name} \
                    SET ${tables.users.columns.refreshtoken.name} = ? \
                    WHERE ${tables.users.columns.email.name} = ?`, 
                    [token, email],
                    (err) => {
                        if(err) return rej(err);
                        return res();
                    }
                );
            db.close( err => (err) ? rej(err.message) : null);
        }),

        getRefreshToken: (email) => new Promise((res, rej) => {
            let db = getDatabase(filename);
            db.get(`SELECT ${tables.users.columns.refreshtoken.name} \
                    FROM ${tables.users.name} \
                    WHERE ${tables.users.columns.email.name} = ?`, 
                    [email],
                    (err, row) => {
                        if(err) return rej(err);
                        return res(row);
                    }
                );
            db.close( err => (err) ? rej(err.message) : null);
        }),

        deleteRefreshToken: (email) => new Promise((res, rej) => {
            let db = getDatabase(filename);
            db.run(`UPDATE ${tables.users.name} \
                    SET ${tables.users.columns.refreshtoken.name} = NULL \
                    WHERE ${tables.users.columns.email.name} = ?`, 
                    [email],
                    (err) => {
                        if(err) return rej(err);
                        return res();
                    }
                );
            db.close( err => (err) ? rej(err.message) : null);
        }),

        tables: tables,
    }
}

const tables = {
    users: {
        name: 'users',
        columns: {
            id: { name: "id" },
            email: { name: "email"},
            password: { name: "password"},
            refreshtoken: { name: "refreshtoken"},
        }
    }
}