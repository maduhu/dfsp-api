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
      name: 'Get first menu',
      method: 'payee.get',
      params: {
        payee: 'bob'
      },
      result: (result, assert) => {
        assert.equals(1, 1)
      }
    }])
  }
}, module.parent)
