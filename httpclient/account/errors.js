var create = require('ut-error').define
var GeneralApiError = require('../generalApiError')
var Account = create('account', GeneralApiError)
var WrongParams = create('WrongParams', Account)
var UnknownPhone = create('UnknownPhone', Account)

module.exports = {
  account: function (cause) {
    return new Account(cause)
  },
  wrongParams: function (params) {
    return new WrongParams({message: 'Wrong params', params: params})
  },
  unknownPhone: function (params) {
    return new UnknownPhone({message: 'Unknown phone', params: params})
  }
}
