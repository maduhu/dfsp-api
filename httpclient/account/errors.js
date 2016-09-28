var create = require('ut-error').define
var GeneralApiError = require('../generalApiError');
var Account = create('account', GeneralApiError)
var WrongParams = create('WrongParams', Account)

module.exports = {
  account: function (cause) {
    return new Account(cause)
  },
  wrongParams: function (cause) {
    return new WrongParams(cause)
  }
}
