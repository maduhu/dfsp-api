module.exports = require('../dfspClient')({
  id: 'ledger',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8014',
  namespace: ['dfsp/ledger'],
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
