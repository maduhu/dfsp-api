var invoiceNotificationRest = require('../../dfsp/transfer/invoiceNotification.add').rest
var rest = Object.assign({}, invoiceNotificationRest, {
  rpc: 'pendingTransactionsApi.invoiceNotification.add',
  path: '/v1/invoiceNotifications'
})
rest.config = Object.assign({}, invoiceNotificationRest.config, {
  tags: ['api', 'pendingTransactions', 'v1', 'invoiceNotifications']
})
module.exports = {
  rest: rest,
  'invoiceNotification.add': function (msg, $meta) {
    return this.bus.importMethod('transfer.invoiceNotification.add')(msg)
  }
}
