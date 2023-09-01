const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);




app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(bodyParser.json({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



io.on('connection', (socket) => {
  console.log('a user connected');
});



app.get('/', (req, res) => {
    res.render('pages/index.ejs');
})



app.post('/anpr', (req, res) => {
  let plate = req.body.results[0].plate;
  let confidence = req.body.results[0].confidence;
  let uuid = req.body.uuid;
  let data = [uuid, plate, confidence];
  app.locals.alpr_data = data
  console.log(app.locals.alpr_data)
  res.send(plate)
})



app.get('/video', (req, res) => {
  console.log(app.locals.alpr_data)
  res.sendFile('alprVideo.mp4', { root: 'public/uploads' });

});


app.listen(5000, () => console.log('listening on port 5000.'));