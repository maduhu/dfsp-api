module.exports = require('../dfspClient')({
  id: 'directory',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8011',
  namespace: ['dfsp/directory'],
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
