const express = require('express');
const path = require('path');

const app = express();










app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));



app.post('/anpr', (req, res) => {
  res.send('POST request to the homepage')
})


app.get('/video', (req, res) => {

  res.sendFile('alprVideo.mp4', { root: 'public/uploads'});
});

app.listen(5000, () => console.log('listening on port 5000.'));