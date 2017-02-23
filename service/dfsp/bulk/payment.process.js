var paymentStatus
module.exports = {
  'payment.process': function (record, $meta) {
    var payment
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
    .then((result) => {
      payment = result
      return this.bus.importMethod('spsp.transfer.payee.get')({
        identifier: payment.userNumber
      })
    })
    .then((payee) => {
      if (!payee.account) {
        return this.config.exec({
          paymentId: payment.recordId,
          paymentStatusId: paymentStatus.failed,
          error: 'user has no active mwallet accounts'
        }, {method: 'bulk.payment.process'})
      }
      return this.bus.importMethod('rule.decision.fetch')({
        currency: payee.currencyCode,
        amount: payment.amount,
        identifier: payment.userNumber
      })
      .then((fee) => {
        return this.bus.importMethod('transfer.push.execute')({
          sourceIdentifier: '',
          sourceAccount: payment.account,
          receiver: payee.spspServer + '/receivers/' + payment.userNumber,
          destinationAmount: payment.amount,
          currency: payee.currencyCode,
          memo: JSON.stringify({
            fee: fee.fee && fee.fee.amount || 0,
            transferCode: 'bulkPayment',
            debitName: payee.name,
            creditName: 'DFSP'
          })
        })
      })
      .then(() => {
        return this.config.exec({
          paymentId: payment.recordId,
          paymentStatusId: paymentStatus.paid
        }, {method: 'bulk.payment.process'})
      })
    })
  }
}
