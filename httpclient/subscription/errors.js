var create = require('ut-error').define
var GeneralApiError = require('../generalApiError')
var Subscription = create('subscription', GeneralApiError)

module.exports = {
  subscription: function (cause) {
    return new Subscription(cause)
  }
}
