module.exports = {
  'invoiceNotification.reject': function (msg, $meta) {
    return this.config.exec.call(this, msg, $meta)
    .then((invoice) => {
      return this.bus.importMethod('notification.notification.add')({
        channel: 'sms',
        operation: 'invoiceCancel',
        target: 'destination',
        identifier: invoice.identifier,
        params: msg
      })
    })
  }
}
