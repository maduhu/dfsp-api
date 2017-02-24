var errors = require('./errors')
module.exports = {
  'account.fetch': function (msg, $meta) {
    /*
      e.g.
      {
        "actorId": "1234"
      }
      or
      {
        "accountNumber": ['bob', 'alice']
      }
    */
    if (msg.actorId) {
      return this.bus.importMethod('dfsp/account.account.fetch')({
        actorId: msg.actorId
      })
      .then((accounts) => {
        if (!accounts.length) {
          return accounts
        }
        return this.config.exec({
          accountNumber: accounts.map(account => account.accountNumber)
        }, $meta)
      })
    } else if (msg.accountNumber) {
      return this.config.exec(msg, $meta)
    } else {
      throw errors.wrongParams({
        params: msg,
        method: $meta.method
      })
    }
  }
}
