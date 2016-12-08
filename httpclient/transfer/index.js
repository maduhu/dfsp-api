module.exports = {
  id: 'transfer',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8018',
  namespace: ['transfer'],
  imports: ['transfer'],
  logLevel: 'debug',
  method: 'post',
  'transfer.push.execute.request.send': function (msg, $meta) {
    return this.bus.importMethod('spsp.transfer.transfer.setup')({
      receiver: msg.destinationAccount,
      sourceAccount: msg.sourceAccount,
      destinationAmount: msg.destinationAmount,
      memo: '',
      sourceIdentifier: msg.sourceName || ''
    }, $meta)
    .then((result) => {
      return this.bus.importMethod('spsp.transfer.transfer.execute')(result)
    })
    .then((result) => {
      return this.config.send(result, $meta)
    })
  },
  'transfer.invoice.add.request.send': function (msg, $meta) {
    $meta.submissionUrl = msg.submissionUrl
    return this.config.send(msg, $meta)
  },
  'transfer.invoice.add.response.receive': function (msg, $meta) {
    var result = this.config.receive(msg, $meta)
    // {
    // account:"http://localhost:8014/ledger/accounts/kkk"
    // amount:"32"
    // currencyCode:"USD"
    // currencySymbol:"$"
    // invoiceId:34
    // invoiceInfo:"Invoice from kkk for 32 USD"
    // name:"kkk"
    // status:"pending"
    // userNumber:"80989354"
    // }
    var params = {
      memo: 'Invoice from ' + result.name + ' for ' + result.amount + ' ' + result.currencyCode,
      submissionUrl: $meta.submissionUrl + '/invoices'
    }
    if (this.bus.config.spsp && this.bus.config.spsp.url && this.bus.config.spsp.url.startsWith('http://localhost')) {
      $meta.method = 'transfer.invoiceNotification.add'
      params.userNumber = result.userNumber
      params.invoiceUrl = 'http://localhost:8010/receivers/invoices/' + result.invoiceId
    } else {
      $meta.method = 'spsp.transfer.invoiceNotification.add'
      params.senderIdentifier = result.userNumber
      params.invoiceId = '' + result.invoiceId
    }
    return this.bus.importMethod($meta.method)(params, $meta)
  }
}
