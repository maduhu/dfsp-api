module.exports = require('../../resthooks')([
  require('./getMerchant'),
  require('./getProductInvoiceInfo'),
  require('./payProductInvoice'),
  require('./getTransactionFees'),
  require('./addProductInvoice')
])
