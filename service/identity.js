var importMethod
module.exports = {
  init: function (b) {
    importMethod = b.importMethod.bind(b)
  },
  check: function () {
    return {
      'permission.get': ['*']
    }
  },
  add: function (msg, $meta) {
    var reversals = []
    $meta.method = 'directory.user.add'
    return importMethod($meta.method)(msg, $meta)
      .then((res) => {
        msg.actorId = '' + res.actorId
        reversals.push({
          method: 'directory.user.remove',
          msg: {
            actorId: res.actorId
          }
        })
        if (msg.phoneNumber) {
          $meta.method = 'subscription.subscription.add'
          return importMethod($meta.method)(msg, $meta)
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
        if (msg.accountId) {
          $meta.method = 'account.account.add'
          return importMethod($meta.method)(msg, $meta)
          .then((res) => {
            reversals.push({
              method: 'account.account.remove',
              msg: {
                accountId: res.accountId
              }
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
