var helpers = require('./helpers')
module.exports = {
  'payment.process': function (record, $meta) {
    var payment
    var payee
    var dispatch = (method, msg, error) => {
      return this.bus.importMethod(method)(msg)
        .catch((e) => {
          return this.config.exec({
            paymentId: payment.paymentId,
            actorId: payment.actorId,
            error: error
          }, {method: 'bulk.payment.process'})
          .then(() => Promise.reject(e))
        })
    }
    return this.bus.importMethod('bulk.payment.preProcess')({
      paymentId: record.paymentId
    })
    .then((result) => {
      payment = result
      return dispatch('spsp.transfer.payee.get', {
        identifier: payment.identifier
      }, 'payee not found')
    })
    .then((result) => {
      payee = result
      if (!payee.account) {
        return this.config.exec({
          paymentId: payment.paymentId,
          actorId: payment.actorId,
          error: 'user has no active mwallet accounts'
        }, {method: 'bulk.payment.process'})
        .then(() => Promise.reject(new Error()))
      }
      var error = helpers.checkPaymentDetails(payment, payee)
      if (error) {
        return this.config.exec({
          paymentId: payment.paymentId,
          actorId: payment.actorId,
          error: error
        }, {method: 'bulk.payment.process'})
        .then(() => Promise.reject(error))
      }
      return dispatch('directory.user.get', {
        actorId: payment.actorId
      }, 'payer not found')
    })
    .then((payer) => {
      return dispatch('rule.decision.fetch', {
        currency: payee.currencyCode,
        amount: payment.amount,
        identifier: payment.identifier
      }, 'fee could not be obtained')
      .then((fee) => {
        return dispatch('transfer.push.execute', {
          sourceIdentifier: payer.identifiers[0].identifier,
          sourceAccount: payment.account,
          receiver: payee.spspServer + '/receivers/' + payment.identifier,
          destinationAmount: payment.amount,
          currency: payee.currencyCode,
          fee: (fee.fee && fee.fee.amount) || 0,
          memo: JSON.stringify({
            fee: (fee.fee && fee.fee.amount) || 0,
            transferCode: 'bulkPayment',
            creditName: payee.name,
            debitName: payer.firstName + ' ' + payer.lastName
          })
        }, 'payment failed')
      })
      .then(() => {
        return this.config.exec({
          paymentId: payment.paymentId,
          actorId: payment.actorId,
          error: ''
        }, {method: 'bulk.payment.process'})
      })
      .catch(() => ({}))
    })
  }
}
