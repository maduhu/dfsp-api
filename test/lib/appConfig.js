/* eslint no-process-env: 0, ut-lint/exists: 0 */
module.exports = {
  server: require('../../server'),
  serverConfig: require('../../server/' + (process.env.UT_ENV || 'test')),
  client: require('../client'),
  clientConfig: require('../client/test'),
  peerImplementations: [
    require('@leveloneproject/dfsp-directory/index_test'),
    require('@leveloneproject/dfsp-rule/index_test'),
    require('@leveloneproject/dfsp-transfer/index_test'),
    require('@leveloneproject/dfsp-ledger/index_test'),
    require('@leveloneproject/dfsp-identity/index_test'),
    require('@leveloneproject/dfsp-account/index_test'),
    require('@leveloneproject/dfsp-subscription/index_test'),
    require('@leveloneproject/dfsp-mock')
  ]
}
