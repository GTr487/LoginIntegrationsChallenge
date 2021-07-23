module.exports = {
    get: ({type, host, port, name}) => {
        switch(type) {
            case "SQLITE3":
            default:
                return [
                    require("./sqlite3functions")(host), 
                    "SQLITE3"
                ];
        }
    }
}
