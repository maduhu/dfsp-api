var errors = require('./errors')
module.exports = {
  id: 'ledger',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8014',
  namespace: ['ledger'],
  imports: ['ledger'],
  logLevel: 'debug',
  method: 'post',
  'ledger.account.get.request.send': function (params, $meta) {
    /*
      e.g.
      {
        phoneNumber": "0122523365226"
      }

    */
    var msg = {
      uri: '/rpc/' + $meta.method,
      payload: {
        id: '1',
        jsonrpc: '2.0',
        method: $meta.method,
        params: {}
      }
    }
    if (params.accountNumber) {
      msg.payload.params.accountNumber = params.accountNumber
      return msg
    } else if (params.actorId) {
      return this.bus.importMethod('account.account.fetch')({
        actorId: params.actorId
      })
      .then((res) => {
        var account = Array.isArray(res) && res[0]
        if (!account) {
          throw errors.accountNotFound({
            phoneNumber: params.phoneNumber
          })
        }
        msg.payload.params.accountNumber = account.accountNumber
        return msg
      })
    } else if (params.phoneNumber) {
      return this.bus.importMethod('subscription.subscription.get')({
        phoneNumber: params.phoneNumber
      })
      .then((res) => {
        if (!res.actorId) {
          throw errors.unknownPhone({
            phoneNumber: params.phoneNumber
          })
        }
        return this.bus.importMethod('account.account.fetch')({
          actorId: res.actorId
        })
        .then((res) => {
          var account = Array.isArray(res) && res[0]
          if (!account) {
            throw errors.accountNotFound({
              phoneNumber: params.phoneNumber
            })
          }
          msg.payload.params.accountNumber = account.accountNumber
          return msg
        })
      })
    } else {
      throw errors.wrongParams({
        params: params,
        method: $meta.method
      })
    }
  }
}
