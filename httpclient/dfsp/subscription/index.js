module.exports = require('../dfspClient')({
  id: 'subscription',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8017',
  namespace: ['dfsp/subscription'],
  logLevel: 'debug',
  method: 'post'
})
