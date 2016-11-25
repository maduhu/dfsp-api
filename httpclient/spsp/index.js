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
  'spsp.payee.get.request.send': function (msg, $meta) {
    return this.bus.importMethod('ist/directory.user.get')({
      identifier: msg.identifier
    })
    .then((res) => {
      return {
        url: res.spspReceiver,
        uri: '/receivers/' + msg.identifier
      }
    })
  },
  'spsp.payee.get.response.receive': function (msg, $meta) {
    return msg.payload
  }
}
