module.exports = function (bus) {
  return bus.importMethod('bulk.payment.getForProcessing')({})
    .then(function (payments) {
      var promise = Promise.resolve()
      payments.forEach(function (payment) {
        promise = promise.then(function () {
          return new Promise(function (resolve) {
            process.nextTick(function () {
              resolve(bus.importMethod('bulk.payment.process')(payment))
            })
          })
        })
      })
      return promise
    })
}
