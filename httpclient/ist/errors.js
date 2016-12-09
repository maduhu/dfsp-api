var create = require('ut-error').define
var Ist = create('ist')
var UserNotFound = create('UserNotFound', Ist)
var UserCouldNotBeAdded = create('UserNotFound', Ist)
module.exports = {
  userNotFound: function (params) {
    return new UserNotFound({message: 'User Not Found', params: params})
  },
  userCouldNotBeAdded: function (params) {
    return new UserCouldNotBeAdded({message: 'User Could not be added', params: params})
  }
}
