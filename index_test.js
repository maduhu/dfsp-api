module.exports = require('ut-run').run({
  app: 'server',
  method: 'debug',
  env: 'test'
}, module)
.then((app) => {
  return Promise.all([
    require('@leveloneproject/dfsp-directory/index_test'),
    require('@leveloneproject/dfsp-rule/index_test'),
    require('@leveloneproject/dfsp-transfer/index_test'),
    require('@leveloneproject/dfsp-ledger/index_test'),
    require('@leveloneproject/dfsp-identity/index_test'),
    require('@leveloneproject/dfsp-account/index_test'),
    require('@leveloneproject/dfsp-subscription/index_test'),
    require('@leveloneproject/dfsp-mock')
  ])
  .catch(() => {
    process.exit(1)
  })
  .then((apps) => {
    return {
      stop: () => {
        apps.concat(app).forEach((x) => x.stop())
      }
    }
  })
})
