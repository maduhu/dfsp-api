module.exports = {
  id: 'notification',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8015',
  namespace: ['notification'],
  imports: ['notification'],
  method: 'post'
}
