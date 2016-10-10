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
    wallet: require('../service/wallet'),
    account: require('../service/account'),
    directory: require('../service/directory'),
    identity: require('../service/identity'),
    ledger: require('../service/ledger'),
    notification: require('../service/notification'),
    rule: require('../service/rule'),
    subscription: require('../service/subscription'),
    transfer: require('../service/transfer')
  },
  validations: {
    wallet: require('../service/wallet/api')
  }
}
