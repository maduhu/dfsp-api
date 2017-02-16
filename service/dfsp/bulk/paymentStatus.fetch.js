var cache = require('../../cache')
module.exports = {
  'paymentStatus.fetch': cache.bind('paymentStatus')
}
