module.exports = require('../../resthooks')([
  require('./push.execute'),
  require('./invoiceNotification.add'),
  require('./invoice.add'),
  require('./invoice.edit'),
  require('./invoice.get'),
  require('./invoice.notify')
])
