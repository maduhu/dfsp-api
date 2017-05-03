var Ws = require('ws')
var logMessage

module.exports = {
  init: function (bus) {
    if (bus.config.forensic) {
      var config = Object.assign({
        host: '127.0.0.1',
        protocol: 'ws'
      }, bus.config.forensic)
      var connectionUrl = config.protocol + '://' + config.host
      if (config.port) {
        connectionUrl += ':' + config.port
      }
      if (config.path) {
        connectionUrl += config.path
      }
      var client
      var connect = function () {
        client = new Ws(connectionUrl)
        client.on('open', function open () {
          // console.log('socket connection opened')
          logMessage = function (msg) {
            client.send(msg)
          }
        })
        client.on('close', function open () {
          // console.log('socket connection closed')
          logMessage = null
          config.reconnectInterval && setTimeout(connect, config.reconnectInterval)
        })
        client.on('error', function open (e) {
          // console.log('socket error', e)
          logMessage = null
        })
      }
      connect()
    }
  },
  log: function (msg) {
    logMessage && logMessage(JSON.stringify(msg))
    return msg
  }
}
