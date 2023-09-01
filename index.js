const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(bodyParser.json({extended : true}));


app.post('/anpr', (req, res) => {
 	let plate = req.body.results[0].plate;
 	let confidence= req.body.results[0].confidence;
 	let uuid = req.body.uuid;
  let data = [plate, confidence,  uuid]; 
  console.log(uuid, plate, confidence,)
  console.log(typeof(data))
  res.send(plate)
})



app.get('/video', (req, res) => {
  res.sendFile('alprVideo.mp4', { root: 'public/uploads' });
});


app.listen(5000, () => console.log('listening on port 5000.'));