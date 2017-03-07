var errors = require('./errors')
module.exports = {
  'check': function (msg, $meta) {
    var userPass = this.bus.config.cluster
    var checkCredentials = userPass && typeof msg.username === 'string' && typeof msg.password === 'string'
    if (checkCredentials && (msg.username !== userPass || msg.password !== userPass)) {
      $meta.statusCode = '401'
      return Promise.reject(errors.invalidCredentials({
        params: {},
        method: $meta.method
      }))
    }
    return this.config.exec(msg, $meta)
  }
}
