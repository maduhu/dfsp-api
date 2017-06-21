module.exports = require('../dfspClient')({
  id: 'notification',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8017',
  namespace: ['dfsp/notification'],
  logLevel: 'debug',
  method: 'post'
})
