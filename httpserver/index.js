var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  log: {
    transform: {
      payee: 'hide',
      name: 'hide',
      firstName: 'hide',
      lastName: 'hide',
      nationalId: 'hide',
      dob: 'hide'
    }
  },
  api: [],
  port: 8010,
  allowXFF: true,
  disableXsrf: {
    http: true,
    ws: true
  },
  bundle: 'ussd',
  dist: path.resolve(__dirname, '../dist'),
  validationPassThrough: true,
  imports: [
    // dfsp modules
    'account.start',
    'directory.start',
    'identity.start',
    'ledger.start',
    'rule.start',
    'subscription.start',
    'transfer.start',
    // common modules
    'payee.start',
    'samples.start',
    'wallet.start',
    'pendingTransactionsApi.start',
    'invoiceApi.start'
  ],
  routes: {
    rpc: {
      method: 'post',
      path: '/rpc/{method?}',
      config: {
        app: {
          skipIdentityCheck: true
        },
        tags: ['rpc'],
        auth: false
      }
    }
  }
}
