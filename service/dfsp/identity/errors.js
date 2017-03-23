var create = require('ut-error').define
var DFSP = require('../../../dfspError')
var Identity = create('identity', DFSP)
var InvalidCredentials = create('invalidCredentials', Identity)
module.exports = {
  invalidCredentials: function (params) {
    return new InvalidCredentials({message: 'Invalid Credentials', params: params})
  }
}
