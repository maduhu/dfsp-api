var create = require('ut-error').define
var GeneralApiError = require('../generalApiError')
var Account = create('account', GeneralApiError)

module.exports = {
  account: function (cause) {
    return new Account(cause)
  }
}
