module.exports = {
  ports: [
    require('../httpclient/identity'),
    require('../httpserver'),
    require('../script'),
    require('../httpclient/account'),
    require('../httpclient/directory'),
    require('../httpclient/ledger'),
    require('../httpclient/notification'),
    require('../httpclient/subscription'),
    require('../httpclient/rule'),
    require('../httpclient/transfer'),
    require('../httpclient/spsp'),
    require('../httpclient/ist')
  ],
  modules: {
    // modules to be imported in the script port
    wallet: require('../service/script/wallet'),
    receivers: require('../service/script/receivers'),
    utils: require('../service/script/utils'),
    // modules to be imported in the http ports
    account: require('../service/http/account'),
    directory: require('../service/http/directory'),
    identity: require('../service/http/identity'),
    ledger: require('../service/http/ledger'),
    notification: require('../service/http/notification'),
    rule: require('../service/http/rule'),
    subscription: require('../service/http/subscription'),
    transfer: require('../service/http/transfer')
  },
  validations: {
    // wallet: require('../service/script/wallet/api')
  }
}
