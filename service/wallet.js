var importMethod
module.exports = {
  init: function (b) {
    importMethod = b.importMethod.bind(b)
  },
  add: function (msg, $meta) {
    /* e.g.
      {
        "userNumber": "123456789",
        "name": "Test Testov",
        "phoneNumber": "0122523365225",
        "accountNumber": "000000044"
      }
    */
    var reversals = []
    var actorId
    $meta.method = 'directory.user.add'
    return importMethod($meta.method)(msg, $meta)
      .then((res) => {
        actorId = '' + res.actorId
        reversals.push({
          method: 'directory.user.remove',
          msg: {
            actorId: actorId
          }
        })
        if (msg.phoneNumber) {
          $meta.method = 'subscription.subscription.add'
          return importMethod($meta.method)({
            actorId: actorId,
            phoneNumber: msg.phoneNumber
          }, $meta)
            .then((res) => {
              reversals.push({
                method: 'subscription.subscription.remove',
                msg: {
                  subscriptionId: res.subscriptionId
                }
              })
            })
        }
      })
      .then(() => {
        if (msg.accountNumber) {
          $meta.method = 'ledger.account.edit'
          return importMethod($meta.method)({
            accountNumber: msg.accountNumber,
            balance: 100,
            name: msg.accountNumber
          }, $meta)
          .then((res) => {
            reversals.push({
              method: 'ledger.account.remove',
              msg: {
                accountNumber: msg.accountNumber
              }
            })
            $meta.method = 'account.account.add'
            return importMethod($meta.method)({
              actorId: actorId,
              accountNumber: msg.accountNumber
            }, $meta)
            .then((res) => {
              reversals.push({
                method: 'account.account.remove',
                msg: {
                  accountNumber: msg.accountNumber
                }
              })
            })
          })
        }
      })
      .then(() => (msg))
      .catch((err) => {
        if (reversals.length) {
          return Promise.all(reversals.map((reversal) => {
            $meta.method = reversal.method
            return importMethod($meta.method)(reversal.msg, $meta)
          }))
          .then(() => {
            throw err
          })
        }
        throw err
      })
  }
}
