var errors = require('./errors')
module.exports = {
  id: 'account',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8009',
  namespace: ['account'],
  method: 'post'
}
