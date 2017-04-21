module.exports = {
  'push.execute': function (msg, $meta) {
    var memo = {}
    if (msg.memo) {
      memo = msg.memo
      memo.debitIdentifier = msg.sourceIdentifier
    }
    var promise = Promise.resolve({
      receiver: msg.receiver,
      sourceAccount: msg.sourceAccount,
      destinationAmount: Number(msg.destinationAmount).toFixed(2),
      memo: JSON.stringify(memo),
      sourceIdentifier: msg.sourceIdentifier,
      sourceAmount: (Number(msg.destinationAmount) + Number(msg.fee || 0)).toFixed(2)
    })
    if (this.bus.config.spsp && this.bus.config.spsp.url && this.bus.config.spsp.url.startsWith('http://localhost')) {
      promise = promise.then((params) => {
        return this.bus.importMethod('spsp.transfer.transfer.setup')(params)
      })
    }
    return promise.then((params) => {
      return this.bus.importMethod('spsp.transfer.transfer.execute')(params)
        .then((result) => {
          return this.config.exec.call(this, result, $meta)
        })
    })
  }
}
