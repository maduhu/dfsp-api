var status = {}
var helpers = require('./helpers')

module.exports = {
  'batch.check': function (msg, $meta) {
    // set status verifying
    var dispatch = (method, params) => {
      $meta.method = method
      params.actorId = msg.actorId
      params.batchId = msg.batchId
      return this.config.exec(params, $meta)
    }
    var importMethod = (method) => {
      return this.bus.importMethod(method)
    }

    function checkPayments (params) {
      return dispatch('bulk.payment.fetch', params)
        .then(function (payments) {
          if (!payments.length) {
            return true
          }
          var promise = Promise.resolve()
          payments.forEach((payment) => {
            promise = promise.then(function () {
              return importMethod('spsp.transfer.payee.get')({identifier: payment.userNumber})
                .then(function (result) {
                  var info = helpers.checkPaymentDetails(payment, result)
                  if (info) {
                    return {
                      paymentStatusId: status.payment.mismatch,
                      info: info
                    }
                  }
                  return {paymentStatusId: status.payment.verified}
                })
                .catch(() => {
                  return {paymentStatusId: status.payment.mismatch, info: 'User not found'}
                })
                .then((params) => {
                  params.paymentId = payment.paymentId
                  return dispatch('bulk.payment.edit', {payments: [params]})
                })
            })
          })
          return promise.then(function () {
            params.pageNumber++
            return checkPayments(params)
          })
        })
    }
    var promise = Promise.resolve()
    if (!Object.keys(status).length) {
      promise = promise
      .then(() => importMethod('bulk.batchStatus.fetch')({}))
      .then(function (batchStatus) {
        status.batch = batchStatus.reduce(function (all, record) {
          all[record.name] = record.key
          return all
        }, {})
      })
      .then(() => importMethod('bulk.paymentStatus.fetch')({}))
      .then(function (paymentStatus) {
        status.payment = paymentStatus.reduce(function (all, record) {
          all[record.name] = record.key
          return all
        }, {})
      })
    }
    promise = promise.then(function () {
      return dispatch('bulk.batch.edit', {
        batchStatusId: status.batch.verifying // set verifying
      })
    })
    .then(function (result) {
      var params = {pageSize: 100, pageNumber: 1, actorId: msg.actorId}
      if (msg.payments) {
        params.paymentId = msg.payments
      } else {
        params.batchId = msg.batchId
      }
      var innerPromise = checkPayments(params)
        .then(function () {
          return dispatch('bulk.batch.revertStatus', {partial: !!msg.payments})
        })
      if (msg.async) {
        process.nextTick(() => innerPromise)
        return result
      }
      return innerPromise
    })
    return promise
  }
}
