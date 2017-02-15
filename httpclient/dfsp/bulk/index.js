module.exports = require('../dfspClient')({
  id: 'bulk',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8018',
  namespace: ['dfsp/bulk'],
  logLevel: 'debug',
  method: 'post'
})
