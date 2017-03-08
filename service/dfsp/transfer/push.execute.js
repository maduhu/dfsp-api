module.exports = {
  'push.execute': function (msg, $meta) {
    var promise
    var params = {
      receiver: msg.receiver,
      sourceAccount: msg.sourceAccount,
      destinationAmount: '' + msg.destinationAmount,
      memo: msg.memo || '',
      sourceIdentifier: msg.sourceIdentifier
    }
    if ((this.bus.config.cluster || '').endsWith('-test')) {
      params.sourceAmount = '' + (parseFloat(msg.destinationAmount) + parseFloat(msg.fee || 0))
      promise = this.bus.importMethod('spsp.transfer.transfer.execute')(params)
    } else {
      promise = this.bus.importMethod('spsp.transfer.transfer.setup')(params)
      .then(this.bus.importMethod('spsp.transfer.transfer.execute'))
    }
    return promise.then((result) => this.config.exec(result, $meta))
  }
}
