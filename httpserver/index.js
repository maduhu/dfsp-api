var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  api: [],
  port: 8010,
  bundle: 'ussd',
  dist: path.resolve(__dirname, '../dist'),
  validationPassThrough: true,
  imports: [
    // dfsp modules
    'account.start',
    'directory.start',
    'identity.start',
    'ledger.start',
    'notification.start',
    'rule.start',
    'subscription.start',
    'transfer.start',
    // common modules
    'payee.start',
    'client.start',
    'invoice.start',
    'samples.start',
    'wallet.start',
  ],
  routes: {
    rpc: {
      method: 'post',
      path: '/rpc/{method?}',
      config: {
        tags: ['rpc'],
        auth: false
      }
    }
  }
}
