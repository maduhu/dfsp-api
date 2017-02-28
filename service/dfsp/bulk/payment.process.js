var paymentStatus
module.exports = {
  'payment.process': function (record, $meta) {
    var promise = Promise.resolve()
    if (!paymentStatus) {
      promise = promise
        .then(() => this.bus.importMethod('bulk.paymentStatus.fetch')({}))
        .then(status => {
          paymentStatus = status.reduce((all, record) => {
            all[record.name] = record.key
            return all
          }, {})
        })
    }
    return promise
    .then(() => {
      return this.bus.importMethod('bulk.payment.preProcess')({
        paymentId: record.paymentId
      })
    })
    .then((payment) => {
      return this.bus.importMethod('spsp.transfer.payee.get')({
        identifier: payment.userNumber
      })
      .then((payee) => {
        return {payment, payee}
      })
      .catch((err) => {
        return this.config.exec({
          paymentId: payment.paymentId,
          paymentStatusId: paymentStatus.failed,
          actorId: payment.actorId,
          error: 'payee not found'
        }, {method: 'bulk.payment.process'})
        .then(() => Promise.reject(err))
      })
    })
    .then((params) => {
      if (!params.payee.account) {
        return this.config.exec({
          paymentId: params.payment.paymentId,
          paymentStatusId: paymentStatus.failed,
          actorId: params.payment.actorId,
          error: 'user has no active mwallet accounts'
        }, {method: 'bulk.payment.process'})
      }
      return this.bus.importMethod('rule.decision.fetch')({
        currency: params.payee.currencyCode,
        amount: params.payment.amount,
        identifier: params.payment.userNumber
      })
      .catch((err) => {
        return this.config.exec({
          paymentId: params.payment.paymentId,
          paymentStatusId: paymentStatus.failed,
          actorId: params.payment.actorId,
          error: 'fee could not be obtained'
        }, {method: 'bulk.payment.process'})
        .then(() => Promise.reject(err))
      })
      .then((fee) => {
        return this.bus.importMethod('transfer.push.execute')({
          sourceIdentifier: this.bus.config.cluster || 'DFSP', // register user to act as debit when sending bulk payments?
          sourceAccount: params.payment.account,
          receiver: params.payee.spspServer + '/receivers/' + params.payment.userNumber,
          destinationAmount: params.payment.amount,
          currency: params.payee.currencyCode,
          memo: JSON.stringify({
            fee: fee.fee && fee.fee.amount || 0,
            transferCode: 'bulkPayment',
            debitName: params.payee.name,
            creditName: this.bus.config.cluster || 'DFSP' // register user to act as debit when sending bulk payments?
          })
        })
        .catch((err) => {
          return this.config.exec({
            paymentId: params.payment.paymentId,
            paymentStatusId: paymentStatus.failed,
            actorId: params.payment.actorId,
            error: 'payment failed'
          }, {method: 'bulk.payment.process'})
          .then(() => Promise.reject(err))
        })
      })
      .then(() => {
        return this.config.exec({
          paymentId: params.payment.paymentId,
          paymentStatusId: paymentStatus.paid,
          actorId: params.payment.actorId,
          error: ''
        }, {method: 'bulk.payment.process'})
      })
      .catch(() => ({}))
    })
  }
}
