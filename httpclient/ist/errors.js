var create = require('ut-error').define
var Ist = create('ist')
var UserNotFound = create('UserNotFound', Ist)
var UserCouldNotBeAdded = create('UserCouldNotBeAdded', Ist)
var UserDfspCouldNotBeChanged = create('UserDfspCouldNotBeChanged', Ist)
module.exports = {
  userNotFound: function (params) {
    return new UserNotFound({message: 'User Not Found', params: params})
  },
  userCouldNotBeAdded: function (params) {
    return new UserCouldNotBeAdded({message: 'User Could not be added', params: params})
  },
  userDfspCouldNotBeChanged: function (params) {
    return new UserDfspCouldNotBeChanged({message: 'User DFSP Could not be changed', params: params})
  }
}
