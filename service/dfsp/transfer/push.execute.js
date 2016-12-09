module.exports = {
  'push.execute': function (msg, $meta) {
    return this.bus.importMethod('spsp.transfer.transfer.setup')({
      receiver: msg.receiver,
      sourceAccount: msg.sourceAccount,
      destinationAmount: msg.destinationAmount,
      memo: msg.memo || '',
      sourceIdentifier: msg.sourceIdentifier
    })
    .then((result) => {
      return this.bus.importMethod('spsp.transfer.transfer.execute')(result)
    })
    .then((result) => {
      return this.config.exec(result, $meta)
    })
  }
}
