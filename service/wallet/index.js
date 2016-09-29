var importMethod
module.exports = {
  init: function (b) {
    importMethod = b.importMethod.bind(b)
  },
  add: function (msg) {
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
    return importMethod('directory.user.add')(msg)
    .then((res) => {
      actorId = '' + res.actorId
      reversals.push({
        method: 'directory.user.remove',
        msg: {
          actorId: actorId
        }
      })
      return res
    })
    .then((res) => {
      if (msg.phoneNumber) { // add subscription for the phone number
        return importMethod('subscription.subscription.add')({
          actorId: actorId,
          phoneNumber: msg.phoneNumber
        })
        .then((res) => {
          reversals.push({
            method: 'subscription.subscription.remove',
            msg: {
              subscriptionId: res.subscriptionId
            }
          })
          return res
        })
      } else {
        return res
      }
    })
    .then((res) => { // create the account in the ledger
      if (msg.accountNumber) {
        return importMethod('ledger.account.edit')({
          accountNumber: msg.accountNumber,
          balance: 1000,
          name: msg.accountNumber
        })
        .then((res) => {
          reversals.push({
            method: 'ledger.account.remove',
            msg: {
              accountNumber: msg.accountNumber
            }
          })
          return res
        })
      } else {
        return res
      }
    })
    .then((res) => { // create the account in the account service
      if (msg.accountNumber) {
        return importMethod('account.account.add')({
          actorId: actorId,
          accountNumber: msg.accountNumber
        })
        .then((res) => {
          reversals.push({
            method: 'account.account.remove',
            msg: {
              accountNumber: msg.accountNumber
            }
          })
          return res
        })
      } else {
        return res
      }
    })
    .then(() => { // add the user and pin, note that in future the user identifier may not be the phone
      return importMethod('identity.add')({
        hash: {
          actorId: actorId,
          identifier: msg.phoneNumber,
          type: 'password',
          password: msg.password
        }
      })
    })
    .then(() => { // add the phone as identification
      return importMethod('identity.add')({
        hash: {
          actorId: actorId,
          identifier: msg.phoneNumber,
          type: 'ussd'
        }
      })
    })
    .catch((err) => {
      if (reversals.length) {
        return Promise.all(reversals.map((reversal) => {
          return importMethod(reversal.method)(reversal.msg)
        }))
        .then(() => {
          throw err
        })
      }
      throw err
    })
  }
}
