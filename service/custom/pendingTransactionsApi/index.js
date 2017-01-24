module.exports = require('../../resthooks')([
  require('./getClient'),
  require('./postInvoice'),
  require('./getPendingInvoiceList'),
  require('./getInvoiceInfo'),
  require('./approveRejectInvoice')
])
