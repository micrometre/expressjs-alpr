const express = require('express');
const path = require('path');

const app = express();



app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));




app.get('/', (req, res) => {

  res.sendFile('alprVideo.mp4', { root: 'public/uploads'});
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));