var create = require('ut-error').define
var GeneralApiError = require('../generalApiError');
var Transfer = create('transfer', GeneralApiError)

module.exports = {
  transfer: function (cause) {
    return new Transfer(cause)
  }
}
