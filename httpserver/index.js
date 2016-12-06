var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  api: ['wallet'],
  port: 8010,
  bundle: 'ussd',
  dist: path.resolve(__dirname, '../dist'),
  validationPassThrough: true,
  imports: [
    // http client modules
    'account.start',
    'directory.start',
    'identity.start',
    'ledger.start',
    'notification.start',
    'rule.start',
    'subscription.start',
    'transfer.start',
    // script modules
    'receivers.start',
    'utils.start'
  ],
  routes: {
    rpc: {
      method: '*',
      path: '/rpc/{method?}',
      config: {
        auth: false
      }
    }
  }
}
