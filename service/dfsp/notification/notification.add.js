var errors = require('./errors')

var nomenclatures = {}

module.exports = {
  'notification.add': function (msg, $meta) {
    var importMethod = (method) => {
      return this.bus.importMethod(method)
    }
    var promise = Promise.resolve()
    if (!Object.keys(nomenclatures).length) {
      promise = promise
      .then(() => importMethod('notification.notificationChannel.fetch')({}))
      .then(function (channel) {
        nomenclatures.channel = channel.reduce(function (all, record) {
          all[record.name] = record.notificationChannelId
          return all
        }, {})
      })
      .then(() => importMethod('notification.notificationOperation.fetch')({}))
      .then(function (operation) {
        nomenclatures.operation = operation.reduce(function (all, record) {
          all[record.name] = record.notificationOperationId
          return all
        }, {})
      })
      .then(() => importMethod('notification.notificationTarget.fetch')({}))
      .then(function (target) {
        nomenclatures.target = target.reduce(function (all, record) {
          all[record.name] = record.notificationTargetId
          return all
        }, {})
      })
    }
    promise.then((result) => {
      if (!nomenclatures.channel[msg.channel] || !nomenclatures.operation[msg.operation] || !nomenclatures.target[msg.target]) {
        throw errors.invalidParameters(msg)
      }
      return this.config.exec.call(this, {
        notificationChannelId: nomenclatures.channel[msg.channel],
        notificationOperationId: nomenclatures.operation[msg.operation],
        notificationTargetId: nomenclatures.target[msg.target],
        destination: msg.destination,
        params: msg.params
      }, $meta)
    })
    return promise
  }
}
