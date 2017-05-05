module.exports = {
  'push.execute': function (msg, $meta) {
    var memo = {}
    if (msg.memo) {
      memo = msg.memo
      memo.debitIdentifier = msg.sourceIdentifier
    }
    return this.bus.importMethod('spsp.transfer.transfer.execute')({
      receiver: msg.receiver,
      accountNumber: msg.accountNumber,
      destinationAmount: Number(msg.destinationAmount).toFixed(2),
      memo: JSON.stringify(memo),
      sourceIdentifier: msg.sourceIdentifier,
      sourceAmount: (Number(msg.destinationAmount) + Number(msg.fee || 0)).toFixed(2)
    })
    .then((result) => {
      return this.config.exec.call(this, result, $meta)
    })
  }
}
