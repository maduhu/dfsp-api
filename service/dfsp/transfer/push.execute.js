module.exports = {
  'push.execute': function (msg, $meta) {
    var memo = {}
    if (msg.memo) {
      memo = msg.memo
      memo.debitIdentifier = msg.sourceIdentifier
    }
    return this.bus.importMethod('spsp.transfer.transfer.execute')({
      transferId: msg.transferId,
      receiver: msg.receiver,
      sourceAccount: msg.sourceAccount,
      destinationAmount: Number(msg.destinationAmount).toFixed(2),
      memo: JSON.stringify(memo),
      sourceIdentifier: msg.sourceIdentifier,
      sourceAmount: (Number(msg.destinationAmount) + Number(msg.fee || 0)).toFixed(2)
    })
    .then((result) => {
      return this.config.exec.call(this, result, $meta)
      .then((res) => {
        return this.bus.importMethod('notification.notification.add')({
          channel: 'sms',
          operation: msg.transferType,
          target: 'source',
          identifier: msg.sourceIdentifier,
          params: {
            amount: msg.destinationAmount,
            currency: msg.currency
          }
        })
        .then(() => {
          return res
        })
      })
    })
  }
}
