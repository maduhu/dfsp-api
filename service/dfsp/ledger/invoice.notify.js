var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'ledger.invoice.notify',
    path: '/receivers/invoices/{invoiceId}/payments/{paymentid}',
    config: {
      description: 'Submit invoice notification',
      notes: 'Submit invoice notification',
      tags: ['api'],
      validate: {
        params: joi.object({
          invoiceId: joi.string().description('Invoice id'),
          paymentId: joi.string().description('Payment id')
        }),
        payload: joi.any()
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice notification submited',
              schema: joi.string()
            }
          }
        }
      }
    },
    method: 'put'
  },
  'invoice.notify': function (msg, $meta) {
    return this.bus.importMethod('ledger.quote.get')({
      paymentId: msg.paymentId,
      isDebit: false
    })
    .catch(() => false)
    .then((quote) => {
      if (!quote) {
        return {}
      }
      return this.bus.importMethod('transfer.invoice.execute')({
        invoiceId: msg.invoiceId,
        identifier: quote.identifier
      })
      .then(() => {
        return this.bus.importMethod('notification.notification.add')({
          channel: 'sms',
          operation: quote.transferType,
          target: 'destination',
          identifier: quote.identifier,
          params: quote
        })
      })
    })
    .then(() => ({}))
  }
}
