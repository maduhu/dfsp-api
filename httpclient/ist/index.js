var errors = require('./errors')
var uuid = require('uuid/v4')
module.exports = {
  id: 'ist',
  createPort: require('ut-port-http'),
  url: 'http://ec2-35-163-231-111.us-west-2.compute.amazonaws.com:8088/directory/v1',
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
        TraceID: uuid(),
        Authorization: 'Basic ' + new Buffer(this.bus.config.cluster + ':' + this.bus.config.cluster).toString('base64')
      },
      qs: {
        identifier: msg.identifier,
        identifierType: msg.identifierType || 'eur'
      }
    }
  },
  'ist.directory.user.get.response.receive': function (msg) {
    return msg.payload.find((el) => el.default)
  },
  'ist.directory.user.get.error.receive': function (err) {
    throw errors.userNotFound({error: err})
  },
  'ist.directory.user.list.request.send': function (msg) {
    return {
      uri: '/resources',
      httpMethod: 'get',
      headers: {
        TraceID: uuid(),
        Authorization: 'Basic ' + new Buffer(this.bus.config.cluster + ':' + this.bus.config.cluster).toString('base64')
      },
      qs: {
        identifier: msg.identifier,
        identifierType: msg.identifierType || 'eur'
      }
    }
  },
  'ist.directory.user.list.response.receive': function (msg) {
    return msg.payload
  },
  'ist.directory.user.list.error.receive': function (err) {
    throw errors.userNotFound({error: err})
  },
  'ist.directory.user.add.request.send': function (msg) {
    return {
      uri: '/resources',
      headers: {
        TraceID: uuid(),
        Authorization: 'Basic ' + new Buffer(this.bus.config.cluster + ':' + this.bus.config.cluster).toString('base64')
      },
      payload: {
        identifier: msg.identifier,
        identifierType: msg.identifierType
      }
    }
  },
  'ist.directory.user.add.response.receive': function (msg) {
    return msg.payload
  },
  'ist.directory.user.add.error.receive': function (err) {
    throw errors.userCouldNotBeAdded({error: err})
  },
  'ist.directory.user.change.request.send': function (msg) {
    return {
      uri: '/resources',
      httpMethod: 'put',
      headers: {
        TraceID: uuid(),
        Authorization: 'Basic ' + new Buffer(this.bus.config.cluster + ':' + this.bus.config.cluster).toString('base64')
      },
      payload: {
        identifier: msg.identifier,
        identifierType: msg.identifierType || 'eur',
        default: true,
        dfsp: msg.dfsp
      }
    }
  },
  'ist.directory.user.change.response.receive': function (msg) {
    return msg.payload
  },
  'ist.directory.user.change.error.receive': function (err) {
    throw errors.userDfspCouldNotBeChanged({error: err})
  }
}
