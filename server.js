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






app.post("/anpr", (req, res, next) => {
  plate = req.body.results[0].plate,
  console.log(plate)

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
    ws.send(plate);
  });
  res.send(plate)

})


app.get('/video', (req, res) => {
  res.sendFile('alprVideo.mp4', { root: 'public/uploads' });
});


server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})