const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serveIndex = require('serve-index')
const path = require('path');
const fs = require( 'fs' );

const app = express();

const PORT = 5000
let clients = [];
let facts = [];

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public'));





function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(facts)}\n\n`;
  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

app.get('/events', eventsHandler);



app.post('/anpr', addFact);
function sendEventsToAll(newFact) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}
async function addFact(request, respsonse, next) {
  const newFact = request.body.results[0].plate;
  facts.push(newFact);
  respsonse.send(newFact)
  console.log(newFact)
  return sendEventsToAll(newFact);
}



app.get('/video', (req, res) => {
  res.sendFile('alprVideo.mp4', { root: 'public/uploads' });

});


app.get( '/images', ( req, res ) => {
  let file_path = req.protocol + '://' + req.get('host') + '/images/';
  let files = fs.readdirSync( './public/images/' );
  files = files
          .map( f => file_path + f ); // map with url path
  res.json( files );
});




app.listen(PORT, () => {
  console.log(`Facts Events service listening at http://localhost:${PORT}`)
})