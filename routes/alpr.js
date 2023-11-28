var express = require('express');
var router = express.Router();

let clients = [];
let facts = [];






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

router.get('/events', eventsHandler);



router.post('/', addFact);
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






module.exports = router;
;