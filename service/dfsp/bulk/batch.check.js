var paymentStatus = {
  VERIFIED: 4,
  MISMATCH: 6
}
var batchStatus = {
  VERIFYING: 2,
  VERIFIED: 9
}

var fieldsToCheck = ['firstName', 'lastName']

function check (msg, $meta) {
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
                var params = {paymentStatusId: paymentStatus.VERIFIED} // set verified
                fieldsToCheck.forEach(function (field) {
                  if (payment[field] !== result[field]) {
                    if (params.info) {
                      params.info += ', ' + field + ' doesn\'t match'
                    } else {
                      params = {paymentStatusId: paymentStatus.MISMATCH, info: '' + field + ' doesn\'t match'} // failed
                    }
                  }
                })
                return params
              })
              .catch(() => {
                return {paymentStatusId: paymentStatus.MISMATCH, info: 'User not found'}
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
  return dispatch('bulk.batch.edit', {
    batchStatusId: batchStatus.VERIFYING // set verifying
  })
  .then(() => {
    var params = {pageSize: 100, pageNumber: 1, actorId: msg.actorId}
    if (msg.payments) {
      params.paymentId = msg.payments
    } else {
      params.batchId = msg.batchId
    }
    return checkPayments(params)
  })
  .then(() => dispatch('bulk.batch.edit', {
    batchStatusId: batchStatus.VERIFIED // set verified
  }))
}

module.exports = {
  'batch.check': function (msg, $meta) {
    if (msg.async) {
      process.nextTick(check.bind(this, msg, $meta))
      return msg
    }
    return check.call(this, msg, $meta)
  }
}
