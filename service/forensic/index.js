var net = require('net')
var log

module.exports = {
  init: function (bus) {
    if (bus.config.forensic) {
      var config = Object.assign({
        host: '127.0.0.1',
        protocol: 'http',
        maxQueueLength: 100
        // key: 'MTMtMTQ5MzkwMjMyMDE5OA=='
      }, bus.config.forensic)
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
            client.write(JSON.stringify(queue.shift()))
          }
          return msg
        }
      }
      log = logMode.idle
      var connect = function () {
        client = new net.Socket()
        client.connect({
          host: config.host,
          port: config.port
        })
        client.on('connect', function connect () {
          // console.log('socket connection opened')
          log = logMode.publish
        })
        client.on('close', function close () {
          // console.log('socket connection closed')
          log = logMode.aggregate
          config.reconnectInterval && setTimeout(connect, config.reconnectInterval)
        })
        client.on('error', function error (e) {
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
