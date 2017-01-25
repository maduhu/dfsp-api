module.exports = {
  ports: [
    require('../httpclient/dfsp/identity'),
    require('../httpclient/dfsp/account'),
    require('../httpclient/dfsp/directory'),
    require('../httpclient/dfsp/ledger'),
    require('../httpclient/dfsp/notification'),
    require('../httpclient/dfsp/subscription'),
    require('../httpclient/dfsp/rule'),
    require('../httpclient/dfsp/transfer'),
    require('../httpclient/spsp'),
    require('../httpclient/ist'),
    require('../httpserver'),
    require('../script/dfsp'),
    require('../script/custom')
  ],
  modules: {
    // modules to be imported in the script port
    wallet: require('../service/custom/wallet'),
    payee: require('../service/custom/payee'),
    samples: require('../service/custom/samples'),
    pendingTransactionsApi: require('../service/v1/pendingTransactionsApi'),
    // modules to be imported in the http ports
    account: require('../service/dfsp/account'),
    directory: require('../service/dfsp/directory'),
    identity: require('../service/dfsp/identity'),
    ledger: require('../service/dfsp/ledger'),
    notification: require('../service/dfsp/notification'),
    rule: require('../service/dfsp/rule'),
    subscription: require('../service/dfsp/subscription'),
    transfer: require('../service/dfsp/transfer')
  },
  validations: {

  }
}
