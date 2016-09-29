module.exports = {
  ports: [
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
    identity: require('../service/identity'),
    wallet: require('../service/wallet')
  },
  validations: {

  }
}
