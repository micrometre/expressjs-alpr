const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const http = require('http')
const WebSocket = require('ws')
const port = 5000
const db = require('./database.js')


app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json({ extended: true }));
app.use('/', express.static('public'));



const server = http.createServer(app);
const wss = new WebSocket.Server({ server })


wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  var interval = setInterval(function () {
    db.all("SELECT * FROM alpr", function (err, rows) {
      rows.forEach(function (row) {
        data = JSON.stringify(row);
        console.log(data)
        ws.send(data)
      });
    });
  }, randomInteger(2, 9) * 1000);
  ws.on('close', function close() {
    clearInterval(interval);
  });
})


function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


app.get('/video', (req, res) => {
  console.log(app.locals.alpr_data)
  res.sendFile('alprVideo.mp4', { root: 'public/uploads' });

});

app.post("/anpr", (req, res, next) => {
  var data = {
    plate: req.body.results[0].plate,
    uuid: req.body.uuid,
    confidence: req.body.results[0].confidence,
    name: req.body.name,
    email: req.body.email,
  }
  var sql = 'INSERT INTO alpr (plate, uuid ) VALUES (?,?)'
  var params = [data.plate, data.uuid]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.json({
      "message": "success",
      "data": data,
      "id": this.lastID
    })
  });
})



app.get("/api/alpr", (req, res, next) => {
  var sql = "select * from alpr"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})