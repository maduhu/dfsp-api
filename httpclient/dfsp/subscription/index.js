module.exports = require('../dfspClient')({
  id: 'subscription',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8017',
  namespace: ['dfsp/subscription', 'dfsp/notification'],
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
