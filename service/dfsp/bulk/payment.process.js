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
        paymentId: record.recordId
      })
    })
    .then((payment) => {
      return this.bus.importMethod('spsp.transfer.payee.get')({
        identifier: payment.userNumber
      })
      .then((payee) => {
        return {payment, payee}
      })
    })
    .then((params) => {
      if (!params.payee.account) {
        return this.config.exec({
          paymentId: params.payment.recordId,
          paymentStatusId: paymentStatus.failed,
          error: 'user has no active mwallet accounts'
        }, {method: 'bulk.payment.process'})
      }
      return this.bus.importMethod('rule.decision.fetch')({
        currency: params.payee.currencyCode,
        amount: params.payment.amount,
        identifier: params.payment.userNumber
      })
      .then((fee) => {
        return this.bus.importMethod('transfer.push.execute')({
          sourceIdentifier: this.bus.config.cluster, // register user to act as debit when sending bulk payments?
          sourceAccount: params.payment.account,
          receiver: params.payee.spspServer + '/receivers/' + params.payment.userNumber,
          destinationAmount: params.payment.amount,
          currency: params.payee.currencyCode,
          memo: JSON.stringify({
            fee: fee.fee && fee.fee.amount || 0,
            transferCode: 'bulkPayment',
            debitName: params.payee.name,
            creditName: this.bus.config.cluster  // register user to act as debit when sending bulk payments?
          })
        })
      })
      .then(() => {
        return this.config.exec({
          paymentId: params.payment.recordId,
          paymentStatusId: paymentStatus.paid
        }, {method: 'bulk.payment.process'})
      })
    })
  }
}
