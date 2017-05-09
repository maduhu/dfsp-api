var net = require('net')
var defaultConfig = {
  // Where the socket server is hosted
  host: '127.0.0.1',
  // The port the socket server listens on
  port: 5678
}

module.exports = function (_config) { // sidecar log factory
  var config = Object.assign({}, defaultConfig, _config)
  var client
  var connected = false
  function connect () {
    return new Promise((resolve, reject) => {
      if (connected) {
        return resolve()
      }
      client = new net.Socket()
      client.connect({
        host: config.host,
        port: config.port
      })
      client.on('connect', function () {
        connected = true
        resolve()
      })
      client.on('close', function () {
        connected = false
        reject(new Error('connection couldn\'t be established'))
      })
    })
  }
  return {
    log: function (msg) {
      msg.time = new Date()
      return connect().then(client.write.bind(client, JSON.stringify(msg)))
    }
  }
}
