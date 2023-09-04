const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;







app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(bodyParser.json({ extended: true }));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


io.on('connection', (socket) => {
  console.log('a user connected');
    socket.on('new message', function (data) {
    var data = (data);
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
    db.serialize(function() {
      console.log('inserting message to database');
      var insertMessageStr = "INSERT INTO messages (username, content, posted) VALUES ('" + socket.username + "','" + data.toString() + "'," + Date.now() + ");"
      console.log(insertMessageStr)
      db.run(insertMessageStr);
    });
  });
});





app.get('/', (req, res) => {
  res.render('index.ejs')
});


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



server.listen(port, function () {
  console.log('Server listening at port %d', port);
});