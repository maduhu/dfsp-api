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
    require('../httpclient/transfer')
  ],
  modules: {
    wallet: require('../service/wallet')
  },
  validations: {
    wallet: require('../service/wallet/api')
  }
}
