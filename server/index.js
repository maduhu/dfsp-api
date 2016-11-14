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
    {
      id: 'ist',
      createPort: require('ut-port-http'),
      url: 'http://ec2-52-37-54-209.us-west-2.compute.amazonaws.com:8088/directory/v1/user',
      namespace: ['ist/directory'],
      raw: {
        json: true,
        jar: true,
        strictSSL: false
      },
      parseResponse: false,
      requestTimeout: 300000,
      method: 'post',
      'directory.user.add.request.send': function (msg) {
        return {
          uri: '/add',
          payload: msg
        }
      }
    }
  ],
  modules: {
    // modules to be imported in the script port
    wallet: require('../service/script/wallet'),
    receivers: require('../service/script/receivers'),
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
    wallet: require('../service/script/wallet/api')
  }
}
