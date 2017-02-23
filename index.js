module.exports = require('ut-run')
.run({}, module)
.then(function (app) {
  function pay () {
    app.bus.importMethod('bulk.payment.getForProcessing')()
      .then(function (payments) {
        var promise = Promise.resolve()
        payments.forEach(function (payment) {
          promise = promise.then(function () {
            return new Promise(function (resolve) {
              process.nextTick(function () {
                resolve(app.bus.importMethod('bulk.payment.process')(payment))
              })
            })
          })
        })
        return promise
      })
      .then(function () {
        setTimeout(pay, app.config.schedulePayments.interval || 10000)
      })
  }
  if (app.config.schedulePayments) {
    process.nextTick(pay)
  }
  return app
})
