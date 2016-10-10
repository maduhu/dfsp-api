var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  api: ['wallet'],
  port: 8010,
  bundle: 'ussd',
  dist: path.resolve(__dirname, '../dist'),
  imports: [
    'account.start',
    'directory.start',
    'identity.start',
    'ledger.start',
    'notification.start',
    'rule.start',
    'subscription.start',
    'transfer.start'
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
