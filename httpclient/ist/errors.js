var create = require('ut-error').define
var GeneralApiError = require('../generalApiError')
var Ist = create('ist', GeneralApiError)
var UserNotFound = create('UserNotFound', Ist)
module.exports = {
  userNotFound: function (params) {
    return new UserNotFound({message: 'User Not Found', params: params})
  }
}
