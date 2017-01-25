module.exports = require('../../resthooks')([
  require('./getInvoiceNotificationList'),
  require('./getInvoiceInfo'),
  require('./approveInvoiceNotification'),
  require('./rejectInvoiceNotification'),
  require('./getClient'),
  require('./postInvoice')
])
