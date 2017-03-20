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
    return {}
  }
}
