var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'invoiceApi.productInvoice.pay',
    path: '/v1/productInvoice/pay',
    config: {
      description: 'Pay product invoice',
      notes: 'Add a pending payment',
      tags: ['api', 'productInvoice', 'v1', 'productInvoicePay'],
      validate: {
        payload: joi.object({
          account: joi.string().description('Client\'s account').example('client').required(),
          productInvoiceId: joi.string().description('Product invoice id').example('1234').required(),
          address: joi.string().description('Merchant\'s address').example('levelone.dfsp2.94844611').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Pending payment created',
              schema: joi.object().keys({
                productInvoiceId: joi.string().description('Product invoice Id').example('6'),
                status: joi.string().description('The new product invoice status').example('paid')
              })
            }
          }
        }
      }
    },
    method: 'post'
  },
  'productInvoice.pay': function (msg, $meta) {
    return {
      productInvoiceId: msg.productInvoiceId,
      status: 'paid'
    }
  }
}
