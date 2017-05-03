var Ws = require('ws')
var log

module.exports = {
  init: function (bus) {
    if (bus.config.forensic) {
      var config = Object.assign({
        host: '127.0.0.1',
        protocol: 'ws',
        maxQueueLength: 100
      }, bus.config.forensic)
      var connectionUrl = config.protocol + '://' + config.host
      if (config.port) {
        connectionUrl += ':' + config.port
      }
      if (config.path) {
        connectionUrl += config.path
      }
      var queue = []
      var client
      var logMode = {
        idle: function (msg) {
          return msg
        },
        aggregate: function (msg) {
          while (queue.length >= config.maxQueueLength) {
            queue.shift()
          }
          queue.push(msg)
          return msg
        },
        publish: function (msg) {
          queue.push(msg)
          while (queue.length) {
            client.send(JSON.stringify(queue.shift()))
          }
          return msg
        }
      }
      log = logMode.idle
      var connect = function () {
        client = new Ws(connectionUrl)
        client.on('open', function open () {
          // console.log('socket connection opened')
          log = logMode.publish
        })
        client.on('close', function close () {
          // console.log('socket connection closed')
          log = logMode.aggregate
          config.reconnectInterval && setTimeout(connect, config.reconnectInterval)
        })
        client.on('error', function open (e) {
          // console.log('socket error', e)
          log = logMode.idle
        })
      }
      connect()
    }
  },
  log: function (msg) {
    return log(msg)
  }
}
