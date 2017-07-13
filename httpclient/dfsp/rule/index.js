module.exports = require('../dfspClient')({
  id: 'rule',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8016',
  namespace: ['dfsp/rule'],
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
