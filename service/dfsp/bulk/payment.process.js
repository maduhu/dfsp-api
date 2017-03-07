module.exports = {
  'payment.process': function (record, $meta) {
    var payment
    var payer
    var dispatch = (method, msg, err) => {
      return this.bus.importMethod(method)(msg)
        .catch((err) => {
          return this.config.exec({
            paymentId: payment.paymentId,
            actorId: payment.actorId,
            error: err
          }, {method: 'bulk.payment.process'})
          .then(() => Promise.reject(err))
        })
    }
    return this.bus.importMethod('bulk.payment.preProcess')({
      paymentId: record.paymentId
    })
    .then((result) => {
      payment = result
      return dispatch('directory.user.get', {
        actorId: result.actorId
      }, 'payer not found')
    })
    .then((user) => {
      payer = user
      return dispatch('spsp.transfer.payee.get', {
        identifier: payment.userNumber
      }, 'payee not found')
    })
    .then((payee) => {
      if (!payee.account) {
        return this.config.exec({
          paymentId: payment.paymentId,
          actorId: payment.actorId,
          error: 'user has no active mwallet accounts'
        }, {method: 'bulk.payment.process'})
      }
      return dispatch('rule.decision.fetch', {
        currency: payee.currencyCode,
        amount: payment.amount,
        identifier: payment.userNumber
      }, 'fee could not be obtained')
      .then((fee) => {
        return dispatch('transfer.push.execute', {
          sourceIdentifier: payer.endUserNumber,
          sourceAccount: payment.account,
          receiver: payee.spspServer + '/receivers/' + payment.userNumber,
          destinationAmount: payment.amount,
          currency: payee.currencyCode,
          fee: fee.fee && fee.fee.amount || 0,
          memo: JSON.stringify({
            fee: fee.fee && fee.fee.amount || 0,
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
