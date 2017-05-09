var uuid = require('uuid/v4')
var errors = require('./errors')
module.exports = {
  id: 'spsp',
  createPort: require('ut-port-http'),
  url: 'http://ec2-35-166-236-69.us-west-2.compute.amazonaws.com:8088/spsp/client/v1',
  _url: 'http://ec2-35-163-249-3.us-west-2.compute.amazonaws.com:8088/spsp/client/v1',
  namespace: ['spsp'],
  raw: {
    json: true,
    jar: true,
    strictSSL: false
  },
  parseResponse: false,
  requestTimeout: 300000,
  logLevel: 'debug',
  method: 'post',
  'spsp.rule.decision.fetch.request.send': function (msg, $meta) {
    var params = {
      httpMethod: 'get',
      headers: {
        'L1p-Trace-Id': uuid(),
        Authorization: 'Basic ' + new Buffer(this.bus.config.cluster + ':' + this.bus.config.cluster).toString('base64')
      },
      qs: {
        identifier: msg.destinationIdentifier,
        identifierType: msg.destinationIdentifierType || 'eur'
      }
    }
    if (msg.amount) {
      msg.destinationAmount = msg.amount
    }
    if (msg.sourceAmount) {
      params.uri = '/quoteSourceAmount'
      params.qs.sourceAmount = msg.sourceAmount
    } else if (msg.destinationAmount) {
      params.uri = '/quoteDestinationAmount'
      params.qs.destinationAmount = msg.destinationAmount
    }
    return params
  },
  'spsp.rule.decision.fetch.response.receive': function (msg, $meta) {
    return msg.payload || {}
  },
  'spsp.rule.decision.fetch.error.receive': function (err, $meta) {
    throw err
  },
  'spsp.transfer.transfer.setup.request.send': function (msg, $meta) {
    return {
      uri: '/setup',
      httpMethod: 'post',
      payload: msg,
      headers: {
        'L1p-Trace-Id': uuid(),
        'content-type': 'application/json'
      }
    }
  },
  'spsp.transfer.transfer.setup.response.receive': function (msg, $meta) {
    return msg.payload || {}
  },
  'spsp.transfer.transfer.setup.error.receive': function (err, $meta) {
    throw err
  },
  'spsp.transfer.transfer.get.request.send': function (msg, $meta) {
    // /setup
  },
  'spsp.transfer.transfer.execute.request.send': function (msg, $meta) {
    var traceId = uuid()
    return {
      uri: '/payments/' + (msg.id || traceId), // whether the payment is executed after setup or directly
      httpMethod: 'put',
      payload: msg,
      headers: {
        'L1p-Trace-Id': traceId,
        'content-type': 'application/json'
      }
    }
  },
  'spsp.transfer.transfer.execute.response.receive': function (msg, $meta) {
    return msg.payload || {}
  },
  'spsp.transfer.transfer.execute.error.receive': function (err, $meta) {
    throw err
  },
  'spsp.transfer.invoiceNotification.add.request.send': function (msg, $meta) {
    // {
    //   invoiceId: '1',
    //   submissionUrl: 'http://localhost:8010/invoices',
    //   senderIdentifier: '132321132',
    //   memo: 'fasdfdsafa'
    // }
    var params = {
      uri: '/invoices',
      httpMethod: 'post',
      payload: msg,
      headers: {
        'L1p-Trace-Id': uuid(),
        'content-type': 'application/json'
      }
    }
    return params
  },
  'spsp.transfer.invoiceNotification.add.response.receive': function (msg, $meta) {
    return msg.payload || {}
  },
  'spsp.transfer.invoiceNotification.add.error.receive': function (err, $meta) {
    throw err
  },
  'spsp.transfer.invoiceNotification.cancel.request.send': function (msg, $meta) {
    // {
    //   invoiceId: '1',
    //   submissionUrl: 'http://localhost:8010/invoices',
    //   senderIdentifier: '132321132'
    // }
    msg.memo = JSON.stringify({status: 'cancelled'})
    var params = {
      uri: '/invoices',
      httpMethod: 'post',
      payload: msg,
      headers: {
        'L1p-Trace-Id': uuid(),
        'content-type': 'application/json'
      }
    }
    return params
  },
  'spsp.transfer.invoiceNotification.cancel.response.receive': function (msg, $meta) {
    return msg.payload || {}
  },
  'spsp.transfer.invoiceNotification.cancel.error.receive': function (err, $meta) {
    throw err
  },
  'spsp.transfer.invoice.get.request.send': function (msg, $meta) {
    return {
      uri: '/query',
      httpMethod: 'get',
      headers: {
        'L1p-Trace-Id': uuid()
      },
      qs: {
        receiver: msg.receiver
      }
    }
  },
  'spsp.transfer.invoice.get.response.receive': function (msg, $meta) {
    return msg.payload
  },
  'spsp.transfer.invoice.get.error.receive': function (err, $meta) {
    throw err
  },
  'spsp.transfer.payee.get.request.send': function (msg, $meta) {
    return this.bus.importMethod('ist.directory.user.get')({
      identifier: msg.identifier
    })
    .then((res) => {
      $meta.spspServer = res.spspReceiver
      return {
        uri: '/query',
        httpMethod: 'get',
        headers: {
          'L1p-Trace-Id': uuid()
        },
        qs: {
          receiver: res.spspReceiver + '/receivers/' + msg.identifier
        }
      }
    })
  },
  'spsp.transfer.payee.get.response.receive': function (msg, $meta) {
    msg.payload.spspServer = $meta.spspServer
    delete $meta.spspServer
    if (!msg.payload.account || msg.payload.account.endsWith('/noaccount')) {
      throw errors.noAccount(msg)
    }
    return msg.payload
  }
}
