var createUser = function (thisArg, msg, $meta) {
  return thisArg.config.exec.call(thisArg, msg, $meta)
    .then((result) => {
      return thisArg.bus.importMethod('forensic.log')({
        message: 'User created',
        payload: {
          identifier: msg.identifier,
          identifierTypeCode: msg.identifierTypeCode
        }
      })
        .then(() => {
          return result
        })
    })
}
var prefix
module.exports = {
  'user.add': function (msg, $meta) {
    if (!msg.identifier) {
      if (!prefix) {
        prefix = this.bus.config.prefix || this.bus.config.cluster.split('-')[0].slice(-1)
      }
      msg.identifier = prefix + ('' + Date.now()).slice(-7)
    }
    return this.bus.importMethod('ist.directory.user.add')(msg)
      .then((res) => {
        var user = {
          identifier: '' + msg.identifier,
          identifierTypeCode: msg.identifierTypeCode || 'phn',
          firstName: msg.firstName,
          lastName: msg.lastName,
          dob: msg.dob,
          nationalId: msg.nationalId
        }
        return this.bus.importMethod('forensic.log')({
          message: 'User added in the central directory',
          payload: {
            identifier: user.identifier,
            identifierTypeCode: user.identifierTypeCode
          }
        })
          .then(() => {
            return createUser(this, user, $meta)
          })
      })
  }
}
