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
          paymentid: joi.string().description('Payment id')
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
    return this.bus.importMethod('ledger.transfer.get')({
      id: msg.paymentid
    })
    .catch(() => false)
    .then((transfer) => {
      if (!transfer) {
        return {}
      }
      return this.bus.importMethod('transfer.invoice.execute')({
        invoiceId: msg.invoiceId,
        identifier: transfer.credits[0] && transfer.credits[0].memo && transfer.credits[0].memo.ilp_decrypted && transfer.credits[0].memo.ilp_decrypted.debitIdentifier
      })
    })
    .then(() => ({}))
  }
}
