module.exports = require('../../resthooks')([
  require('./invoiceNotification.add'),
  require('./invoice.get'),
  require('./invoice.edit')
])
