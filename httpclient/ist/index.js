var errors = require('./errors')
var uuid = require('uuid/v4')
var prefix
module.exports = {
  id: 'ist',
  createPort: require('ut-port-http'),
  url: 'http://ec2-35-166-236-69.us-west-2.compute.amazonaws.com:8088/directory/v1',
  namespace: ['ist'],
  raw: {
    json: true,
    jar: true,
    strictSSL: false
  },
  parseResponse: false,
  requestTimeout: 300000,
  logLevel: 'debug',
  method: 'post',
  start: function () {
    prefix = this.bus.config.prefix || this.bus.config.cluster.split('-')[0].slice(-1)
  },
  'ist.directory.user.get.request.send': function (msg) {
    return {
      uri: '/resources',
      httpMethod: 'get',
      headers: {
        'L1p-Trace-Id': uuid(),
        'Authorization': 'Basic ' + new Buffer(this.config.key + ':' + this.config.secret).toString('base64')
      },
      qs: {
        identifier: 'eur:' + msg.identifier
      }
    }
  },
  'ist.directory.user.get.response.receive': function (msg) {
    if (!msg.payload.dfsp_details.account || msg.payload.dfsp_details.account.endsWith('/noaccount')) {
      throw errors.noAccount(msg)
    }
    if (msg.payload.fraud_details.score > this.bus.config.fraudThreshold.userScore) {
      throw errors.userIsAboveFraudThreshold(msg)
    }
    return msg.payload
  },
  'ist.directory.user.get.error.receive': function (err) {
    throw errors.userNotFound({error: err})
  },
  'ist.directory.user.add.request.send': function (msg) {
    return {
      uri: '/resources',
      headers: {
        'L1p-Trace-Id': uuid(),
        'Authorization': 'Basic ' + new Buffer(this.config.key + ':' + this.config.secret).toString('base64')
      },
      payload: {
        identifier: (msg.identifierType || 'eur') + ':' + (msg.identifier || (prefix + Date.now().slice(-7))),
        preferred: true
      }
    }
  },
  'ist.directory.user.add.response.receive': function (msg) {
    return msg.payload
  },
  'ist.directory.user.add.error.receive': function (err) {
    throw errors.userCouldNotBeAdded({error: err})
  }
}
