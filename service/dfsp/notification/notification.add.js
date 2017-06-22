var errors = require('./errors')
var nomenclatures = {}

module.exports = {
  'notification.add': function (msg, $meta) {
    var promise = Promise.resolve()
    if (!Object.keys(nomenclatures).length) {
      promise = promise
      .then(() => this.bus.importMethod('notification.notificationChannel.fetch')({}))
      .then(function (channel) {
        nomenclatures.channel = channel.reduce(function (all, record) {
          all[record.name] = record.notificationChannelId
          return all
        }, {})
      })
      .then(() => this.bus.importMethod('notification.notificationOperation.fetch')({}))
      .then(function (operation) {
        nomenclatures.operation = operation.reduce(function (all, record) {
          all[record.name] = record.notificationOperationId
          return all
        }, {})
      })
      .then(() => this.bus.importMethod('notification.notificationTarget.fetch')({}))
      .then(function (target) {
        nomenclatures.target = target.reduce(function (all, record) {
          all[record.name] = record.notificationTargetId
          return all
        }, {})
      })
    }
    return promise.then(() => {
      if (msg.actorId) {
        return msg
      }
      return this.bus.importMethod('directory.user.get')({
        identifier: msg.identifier
      })
    })
    .then((res) => {
      if (!nomenclatures.channel[msg.channel] || !nomenclatures.operation[msg.operation] || !nomenclatures.target[msg.target]) {
        throw errors.invalidParameters(msg)
      }
      return this.bus.importMethod('notification.add.execute')({
        notificationChannelId: nomenclatures.channel[msg.channel],
        notificationOperationId: nomenclatures.operation[msg.operation],
        notificationTargetId: nomenclatures.target[msg.target],
        actorId: res.actorId,
        params: msg.params
      })
    })
  }
}
