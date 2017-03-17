module.exports = {
  'user.add': function (msg, $meta) {
    if (!msg.identifier) {
      return this.bus.importMethod('ist.directory.user.add')({
        identifier: msg.identifier,
        identifierType: msg.identifierType
      })
      .then((res) => {
        return this.config.exec({
          identifier: msg.identifier,
          identifierTypeCode: msg.identifierType,
          firstName: msg.firstName,
          lastName: msg.lastName,
          dob: msg.dob,
          nationalId: msg.nationalId
        }, $meta)
      })
    }
    return this.config.exec(msg, $meta)
  }
}
