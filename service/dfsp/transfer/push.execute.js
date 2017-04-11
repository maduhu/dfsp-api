module.exports = {
  'push.execute': function (msg, $meta) {
    return this.bus.importMethod('spsp.transfer.transfer.execute')({
      receiver: msg.receiver,
      sourceAccount: msg.sourceAccount,
      destinationAmount: Number(msg.destinationAmount).toFixed(2),
      memo: msg.memo || '',
      sourceIdentifier: msg.sourceIdentifier,
      sourceAmount: (Number(msg.destinationAmount) + Number(msg.fee || 0)).toFixed(2)
    })
    .then((result) => {
      return this.config.exec(result, $meta)
    })
    // var promise
    // var params = {
    //   receiver: msg.receiver,
    //   sourceAccount: msg.sourceAccount,
    //   destinationAmount: Number(msg.destinationAmount).toFixed(2),
    //   memo: msg.memo || '',
    //   sourceIdentifier: msg.sourceIdentifier
    // }
    // if ((this.bus.config.cluster || '').endsWith('-test')) {
    //   params.sourceAmount = (Number(msg.destinationAmount) + Number(msg.fee || 0)).toFixed(2)
    //   promise = this.bus.importMethod('spsp.transfer.transfer.execute')(params)
    // } else {
    //   promise = this.bus.importMethod('spsp.transfer.transfer.setup')(params)
    //   .then((result) => {
    //     result.destinationAmount = Number(result.destinationAmount).toFixed(2)
    //     result.sourceAmount = Number(result.sourceAmount).toFixed(2)
    //     return this.bus.importMethod('spsp.transfer.transfer.execute')(result)
    //   })
    // }
    // return promise.then((result) => this.config.exec(result, $meta))
  }
}
