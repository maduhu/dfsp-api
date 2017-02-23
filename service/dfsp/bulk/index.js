module.exports = require('../../resthooks')([
  require('./batch.check'),
  require('./batchStatus.fetch'),
  require('./paymentStatus.fetch'),
  require('./payment.process')
])
