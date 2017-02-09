var bus
module.exports = {
  id: 'dfsp',
  createPort: require('ut-port-script'),
  imports: [
    'identity',
    'account',
    'directory',
    'ledger',
    'notification',
    'subscription',
    'rule',
    'transfer',
    'bulk'
  ],
  logLevel: 'trace',
  start: function () {
    bus = this.bus
  },
  exec: function (msg, $meta) {
    $meta.method = 'dfsp/' + $meta.method
    return bus.importMethod($meta.method)(msg, $meta)
  }
}
