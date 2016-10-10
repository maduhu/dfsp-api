module.exports = {
  id: 'directory',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8011',
  namespace: ['directory'],
  imports: ['directory'],
  method: 'post'
}
