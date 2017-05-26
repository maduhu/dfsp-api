/* eslint no-console: 0 */
var test = require('ut-run/test')
// var commonFunc = require('./../lib/commonFunctions.js')
// var joi = require('joi')
var config = require('./../lib/appConfig')

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
      params: {
        firstName: 'firstname',
        lastName: 'lastname',
        dob: '10/12/1999',
        nationalId: '123456789',
        phoneNumber: '987654321',
        accountName: 'firstnamelastname',
        password: '1234',
        roleName: 'merchant'
      },
      result: (result, assert) => {
        assert.equals(1, 1)
      }
    }])
  }
}, module.parent)
