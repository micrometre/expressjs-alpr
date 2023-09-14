var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "db.sqlite"
let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE alpr (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plate text, 
            uuid text
            )`,
            (err) => {
                if (err) {
                } else {
                    console.log('Connected to the SQLite database.')
                }
            });
    }
});

module.exports = db