var bus
var cacheCollection
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
  cacheableMethods: [
    'identity.role.fetch',
    'ledger.transferType.fetch',
    'bulk.batchStatus.fetch',
    'bulk.paymentStatus.fetch',
    'ledger.accountType.fetch',
    'transfer.invoiceType.fetch',
    'notification.notificationChannel.get',
    'notification.notificationOperation.get',
    'notification.notificationTarget.get'
  ],
  logLevel: 'trace',
  start: function () {
    bus = this.bus
    cacheCollection = this.bus.importMethod('cache.collection')('dfsp')
  },
  exec: function (msg, $meta) {
    var method = $meta.method
    $meta.method = 'dfsp/' + $meta.method
    if (~this.config.cacheableMethods.indexOf(method)) {
      return cacheCollection.then((cache) => {
        return cache.get(method)
        .then((res) => {
          if (!res) {
            return bus.importMethod($meta.method)(msg)
              .then((r) => {
                return cache.set(method, r)
              })
          }
          return res
        })
      })
    }
    return bus.importMethod($meta.method)(msg)
  }
}
