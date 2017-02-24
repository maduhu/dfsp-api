module.exports = require('../../resthooks')([
  require('./account.get'),
  require('./account.fetch')
])
