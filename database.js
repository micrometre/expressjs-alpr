var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE alpr (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            password text, 
            plate text, 
            uuid text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO alpr ( password, plate, uuid ) VALUES (?,?,?,?)'
                db.run(insert, ["admin",md5("admin123456")])
                db.run(insert, ["user",md5("user123456")])
                db.run(insert, ["superuser",md5("user123456")])
            }
        });  
    }
});


module.exports = db