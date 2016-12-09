var errors = require('./errors')
module.exports = {
  id: 'ist',
  createPort: require('ut-port-http'),
  url: 'http://ec2-35-163-231-111.us-west-2.compute.amazonaws.com:8088/directory/v1',
  namespace: ['ist'],
  headers: {
    Authorization: 'Basic ' + new Buffer('dfsp1' + ':' + 'dfsp1').toString('base64')
  },
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
      qs: {
        identifier: msg.identifier,
        identifierType: 'eur'
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
    return {
      uri: '/user-registration/users',
      payload: {
        url: msg.url
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
