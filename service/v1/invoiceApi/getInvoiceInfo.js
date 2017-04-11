var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'invoiceApi.invoiceInfo.get',
    path: '/v1/invoice/{invoiceId}',
    config: {
      description: 'Get the payment details by given paymentId',
      notes: 'Get the payment details by given paymentId',
      tags: ['api', 'pendingPaymentss', 'v1', 'getPaymentInfo', 'invoiceApi'],
      validate: {
        params: joi.object({
          invoiceId: joi.string().description('Invoice id').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice information',
              schema: joi.object().keys({
                type: joi.string().description('Type'),
                invoiceId: joi.number().description('Invoice Id'),
                account: joi.string().description('Account'),
                name: joi.string().description('Name'),
                currencyCode: joi.string().description('Currency Code'),
                currencySymbol: joi.string().description('Currency Symbol'),
                amount: joi.string().description('Amount'),
                status: joi.string().description('Status'),
                invoiceType: joi.string().description('Invoice Type'),
                merchantIdentifier: joi.string().description('Identifier'),
                invoiceInfo: joi.string().description('Invoice Info')
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'invoiceInfo.get': function (msg, $meta) {
    return this.bus.importMethod('dfsp/transfer.invoice.get')(msg)
  }
}
