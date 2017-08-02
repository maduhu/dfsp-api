module.exports = {
  'user.get': function (msg, $meta) {
    var directoryQuery = msg
    var promise = Promise.resolve()
    if (msg.actorId) {
      directoryQuery = {
        actorId: msg.actorId
      }
    } else if (msg.identifier && msg.identifier.length !== 8) {
      promise = promise.then(() => {
        return this.bus.importMethod('subscription.subscription.fetch')({
          phoneNumber: msg.identifier,
          primary: true
        })
        .then((res) => {
          directoryQuery = {
            actorId: res[0].actorId
          }
        })
      })
    }
    return promise.then(() => {
      return this.config.exec.call(this, directoryQuery, $meta)
    })
  }
}
