module.exports = require('../dfspClient')({
  id: 'account',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8009',
  namespace: ['dfsp/account'],
  logLevel: 'debug',
  log: {
    transform: {
      payee: 'hide',
      name: 'hide',
      firstName: 'hide',
      lastName: 'hide',
      nationalId: 'hide',
      dob: 'hide'
    }
  },
  method: 'post'
})
