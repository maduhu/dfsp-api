module.exports = {
  id: 'account',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8009',
  namespace: ['account'],
  imports: ['account'],
  logLevel: 'debug',
  method: 'post'
}
