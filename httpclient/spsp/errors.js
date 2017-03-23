var create = require('ut-error').define
var DFSP = require('../../dfspError')
var SPSP = create('spsp', DFSP)
var NoAccount = create('noaccount', SPSP)
module.exports = {
  noAccount: function (params) {
    return new NoAccount({message: 'User has no active mwallet accounts', params: params})
  }
}
