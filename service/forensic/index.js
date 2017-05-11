var UTLog = require('ut-log')
var SocketStream = require('ut-log/socketStream')
var log
module.exports = {
  init: function (bus) {
    if (bus.config.forensic) {
      log = (new UTLog({
        type: 'bunyan',
        streams: [{
          level: 'info',
          stream: new SocketStream({
            host: bus.config.forensic.host || '127.0.0.1',
            port: bus.config.forensic.port,
            objectMode: true
          })
        }]
      })).createLog('info', {name: 'forensic', context: 'forensic'})
    }
  },
  log: function (msg) {
    log && log.info(msg)
    return msg
  }
}
