module.exports = {
  'check': function (msg, $meta) {
    var userPass = this.bus.config.cluster
    if (
      // api basic auth
      userPass &&
      typeof userPass === 'string' &&
      msg.username === userPass &&
      msg.password === userPass
    ) {
      return {
        'permission.get': ['*']
      }
    }
    return this.config.exec.call(this, msg, $meta)
      .then((result) => {
        if (!result['identity.check']) {
          return result
        }
        return this.bus.importMethod('directory.user.get')({
          actorId: result['identity.check'].actorId
        })
          .then((person) => {
            result.person = person
            result.emails = []
            return result
          })
      })
  }
}
