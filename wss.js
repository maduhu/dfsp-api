const WebSocket = require('ws');

const wss = new WebSocket.Server({ host: '127.0.0.1', port: 5678 });

wss.on('connection', function connection(ws) {
  console.log('connection')
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});