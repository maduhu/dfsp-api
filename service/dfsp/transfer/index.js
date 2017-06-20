module.exports = require('../../resthooks')([
  require('./push.execute'),
  require('./transfer.execute'),
  require('./invoiceNotification.add'),
  require('./invoice.add'),
  require('./invoicePayer.fetch'),
  require('./invoice.cancel'),
  require('./invoice.execute'),
  require('./invoice.get')
])
