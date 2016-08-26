module.exports = {
  id: 'transfer',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8018',
  namespace: ['transfer'],
  method: 'post',
  'transfer.push.execute': function (msg) {
    return {
      payload: {
        result: {
          fulfillment: 'tx-mock'
        }
      }
    }
  }
}
