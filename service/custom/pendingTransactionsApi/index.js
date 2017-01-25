module.exports = require('../../resthooks')([
  require('./getClient'),
  require('./postInvoice'),
  require('./getInvoiceNotificationList'),
  require('./getInvoiceInfo'),
  require('./approveInvoiceNotification'),
  require('./rejectInvoiceNotification')
])
