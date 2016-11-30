module.exports = {
  id: 'subscription',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8017',
  namespace: ['subscription'],
  imports: ['subscription'],
  logLevel: 'debug',
  method: 'post'
}
