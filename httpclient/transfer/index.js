module.exports = {
  id: 'transfer',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8018',
  namespace: ['transfer'],
  imports: ['transfer'],
  method: 'post'
  }
