const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));


app.use(bodyParser.json({extended : true}));
app.post('/anpr', (req, res) => {
 	var plate = req.body.results[0].plate;
  console.log(plate)
  res.send('POST request to the homepage')
})


app.get('/video', (req, res) => {

  res.sendFile('alprVideo.mp4', { root: 'public/uploads' });
});

app.listen(5000, () => console.log('listening on port 5000.'));