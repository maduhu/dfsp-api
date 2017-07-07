var createUser = function (thisArg, msg, $meta) {
  return thisArg.config.exec.call(thisArg, msg, $meta)
    .then((result) => {
      return thisArg.bus.importMethod('forensic.log')({
        message: 'User created',
        payload: msg
      })
        .then(() => {
          return result
        })
    })
}

module.exports = {
  'user.add': function (msg, $meta) {
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
          payload: user
        })
          .then(() => {
            return createUser(this, user, $meta)
          })
      })
  }
}
