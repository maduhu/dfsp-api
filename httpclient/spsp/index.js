module.exports = {
  id: 'spsp',
  createPort: require('ut-port-http'),
  namespace: ['spsp'],
  raw: {
    json: true,
    jar: true,
    strictSSL: false
  },
  parseResponse: false,
  requestTimeout: 300000,
  method: 'get',
  uri: '',
  'spsp.invoice.get.request.send': function (msg) {
    return {
      url: msg.url
    }
  },
  'spsp.invoice.get.error.receive': function (msg) {
    return msg
  },
  'spsp.invoice.get.response.receive': function (msg) {
    return msg.payload
  },
  'spsp.payee.get.request.send': function (msg, $meta) {
    return this.bus.importMethod('ist/directory.user.get')({
      identifier: msg.identifier
    })
    .then((res) => {
      $meta.submissionUrl = res.spspReceiver
      return {
        url: res.spspReceiver,
        uri: '/receivers/' + msg.identifier
      }
    })
  },
  'spsp.payee.get.response.receive': function (msg, $meta) {
    msg.payload.submissionUrl = $meta.submissionUrl
    delete $meta.submissionUrl
    return msg.payload
  }
}
