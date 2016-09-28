var create = require('ut-error').define
var GeneralApiError = require('../generalApiError');
var Notification = create('notification', GeneralApiError)

module.exports = {
  notification: function (cause) {
    return new Notification(cause)
  }
}
