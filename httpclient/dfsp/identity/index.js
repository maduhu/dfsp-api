module.exports = require('../dfspClient')({
  id: 'identity',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8012',
  namespace: ['dfsp/identity'],
  logLevel: 'debug',
  method: 'post',
  'identity.check': function () {
    return {
      payload: {
        jsonrpc: '2.0',
        method: 'identity.check',
        id: '1',
        result: {
          'permission.get': ['*']
        }
      }
    }
  }
})
