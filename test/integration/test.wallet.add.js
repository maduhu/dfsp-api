/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var joi = require('joi')
var config = require('./../lib/appConfig')
const merchant = {
  firstName: 'firstname' + commonFunc.generateRandomNumber(),
  lastName: 'lastname' + commonFunc.generateRandomNumber(),
  dob: '10/12/1999',
  nationalId: '' + commonFunc.generateRandomNumber(),
  phoneNumber: '' + commonFunc.generateRandomNumber(),
  accountName: 'acc_' + commonFunc.generateRandomNumber(),
  password: '1234',
  roleName: 'merchant'
}
test({
  type: 'integration',
  name: 'DFSP API service',
  server: config.server,
  serverConfig: config.serverConfig,
  client: config.client,
  clientConfig: config.clientConfig,
  peerImplementations: config.peerImplementations,
  steps: function (test, bus, run) {
    return run(test, bus, [{
      // home screen
      name: 'Add merchant',
      method: 'wallet.add',
      params: merchant,
      result: (result, assert) => {
        assert.equals(joi.validate(result, joi.object().keys({
          account: 'http://localhost:8014/ledger/accounts/' + merchant.accountName,
          accountName: joi.string().valid(merchant.accountName),
          accountNumber: joi.string().valid(merchant.accountName),
          actorId: joi.string().required(),
          currency: joi.string().required(),
          dob: joi.string().valid('10/12/1999'),
          firstName: joi.string().valid(merchant.firstName),
          identifier: joi.string().required(),
          lastName: joi.string().valid(merchant.lastName),
          nationalId: joi.string().valid(merchant.nationalId),
          password: joi.string().valid('1234'),
          phoneNumber: joi.string().valid(merchant.phoneNumber),
          roleName: joi.string().valid('merchant')
        })).error, null)
      }
    }])
  }
}, module.parent)
