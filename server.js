const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const db = require('./database.js')


const path = require('path');
const bodyParser = require('body-parser')



app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(bodyParser.json({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
  res.render('pages/index.ejs');
})


app.get('/video', (req, res) => {
  console.log(app.locals.alpr_data)
  res.sendFile('alprVideo.mp4', { root: 'public/uploads' });

});

io.on('connection', (socket) => {
  socket.emit("alpr", app.locals.alpr_data);
});
/*
app.post('/anpr', async (req, res) => {
  let plate = req.body.results[0].plate;
  let confidence = req.body.results[0].confidence;
  let uuid = req.body.uuid;
  let data = [uuid, plate, confidence];
  app.locals.alpr_data = data
  console.log(app.locals.alpr_data)
  res.send(app.locals.alpr_data)
})

*/

app.post("/anpr", (req, res, next) => {
  var data = {
    uuid: req.body.uuid,
   plate : req.body.results[0].plate,
    confidence: req.body.results[0].confidence,
    name: req.body.name,
    email: req.body.email,
  }
  var sql = 'INSERT INTO alpr (name, email, password) VALUES (?,?,?)'
  var params = [data.name, data.email, data.password]
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





server.listen(5000, () => {
  console.log('listening on *:3000');
});