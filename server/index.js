module.exports = {
  ports: [
    require('../httpserver'),
    require('../script'),
    require('../httpclient/account'),
    require('../httpclient/directory'),
    require('../httpclient/notification'),
    require('../httpclient/subscription'),
    require('../httpclient/transfer')
  ],
  modules: {
    identity: require('../service/identity')
  },
  validations: {

  }
}
