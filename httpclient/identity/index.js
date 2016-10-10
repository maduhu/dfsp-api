module.exports = {
  id: 'identity',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8012',
  namespace: ['identity'],
  imports: ['identity'],
  method: 'post',
  'identity.check': function () {
    return {
      payload: {
        result: {
          'permission.get': ['*']
        }
      }
    }
  }
}
