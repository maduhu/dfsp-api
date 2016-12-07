var snakeToCamelRegExp = /_\w/g
function snakeToCamel (value) {
  return value.replace(snakeToCamelRegExp, function (m) {
    return m[1].toUpperCase()
  })
}
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
  logLevel: 'debug',
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
    return msg.payload && Object.keys(msg.payload).reduce((obj, key) => {
      obj[snakeToCamel(key)] = msg.payload[key]
      return obj
    }, {})
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
