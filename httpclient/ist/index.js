var errors = require('./errors')
var url = require('url')
var uuid = require('uuid/v4')
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
    return msg.payload
  },
  'ist.directory.user.get.error.receive': function (err) {
    throw errors.userNotFound({error: err})
  },
  'ist.directory.user.add.request.send': function (msg) {
    var urlProps = url.parse(this.config.url)
    return {
      uri: '/user-registration/users',
      headers: {
        'L1p-Trace-Id': uuid(),
        'Authorization': 'Basic ' + new Buffer(this.config.key + ':' + this.config.secret).toString('base64')
      },
      payload: {
        url: urlProps.hostname + ':8088/scheme/adapter/v1'
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
