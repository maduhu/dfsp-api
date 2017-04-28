module.exports = require('../../resthooks')([
  require('./push.execute'),
  require('./invoiceNotification.add'),
  require('./invoice.add'),
  require('./invoice.cancel'),
  require('./invoice.edit'),
  require('./invoice.get')
])
