var errors = require('./errors')
module.exports = {
  'check': function (msg, $meta) {
    var userPass = this.bus.config.cluster
    var checkCredentials = userPass && typeof msg.username === 'string' && typeof msg.password === 'string'
    if (checkCredentials && (msg.username !== userPass || msg.password !== userPass)) {
      var error = errors.invalidCredentials({
        params: {},
        method: $meta.method
      })
      error.statusCode = 401
      return Promise.reject(error)
    }
    return this.config.exec(msg, $meta)
  }
}
