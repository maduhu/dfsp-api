var errors = require('./errors');
module.exports = {
  id: 'account',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8009',
  namespace: ['account'],
  method: 'post',
  'account.account.get.request.send': function (params, $meta) {
    var msg = {
      uri: '/rpc',
      payload : {
        id: '1',
        jsonrpc: '2.0',
        method: $meta.method,
        params: {}
      }
    };
    if (params.actorId) {
      msg.payload.params.actorId = params.actorId;
      return msg;
    } else if (params.phoneNumber) {
      return this.bus.importMethod('subscription.subscription.get')({
        phoneNumber: params.phoneNumber
      })
      .then(function(result) {
        msg.payload.params.actorId = result.actorId;
        return msg;
      })
    } else {
      throw errors.wrongParams({
        params: params,
        method: $meta.method
      });
    }
  }
}
