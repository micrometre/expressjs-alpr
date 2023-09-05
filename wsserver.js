const http = require('http')
const express = require('express')
const WebSocket = require('ws')
const app = express()
const port = 5000

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })
const db = require('./database.js')
const cors = require('cors');

const path = require('path');
const bodyParser = require('body-parser')




app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(bodyParser.json({ extended: true }));
app.use('/', express.static('public'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


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








getAlprFunction()




var data = "Real-Time Update 1";
var number = 1;
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })




  var interval = setInterval(function () {
    data = "Real-Time Update " + number;
    console.log("SENT: " + data);
    ws.send(data)
    number++;
  }, randomInteger(2, 9) * 1000);

  ws.on('close', function close() {
    clearInterval(interval);
  });
})

function getAlprFunction() {
  db.all("SELECT * FROM alpr", function (err, rows) {
    rows.forEach(function (row) {
      console.log(row)
    })
  })
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})