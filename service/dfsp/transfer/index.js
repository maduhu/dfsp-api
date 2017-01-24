module.exports = require('../../resthooks')([
  require('./push.execute'),
  require('./invoiceNotification.add'),
  require('./invoice.get'),
  require('./invoice.edit'),
  require('./invoice.add'), // to remove
  require('./invoice.fetch'),
  require('./invoice.details'),
  require('./invoice.approveReject')
])
