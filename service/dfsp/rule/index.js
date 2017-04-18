module.exports = require('../../resthooks')([
  require('./decision.fetch'),
  require('./item.fetch')
])
