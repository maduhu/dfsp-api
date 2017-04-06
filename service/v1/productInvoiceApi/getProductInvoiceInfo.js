var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'productInvoiceApi.productInvoiceInfo.get',
    path: '/v1/productInvoiceInfo/{productInvoiceId}',
    config: {
      description: 'Get the payment details by given paymentId',
      notes: 'Get the payment details by given paymentId',
      tags: ['api', 'pendingPaymentss', 'v1', 'getPaymentInfo'],
      validate: {
        params: joi.object({
          productInvoiceId: joi.string().description('Product invoice id').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Product invoice details',
              schema: joi.object().keys({
                firstName: joi.string().description('Merchant\'s first name'),
                lastName: joi.string().description('Merchant\'s last name'),
                amount: joi.number().description('Product invoice amount'),
                currencyCode: joi.string().description('Product invoice currency code'),
                currencySymbol: joi.string().description('Product invoice symbol'),
                fee: joi.number().description('Local fee amount'),
                description: joi.string().description('Description about the product invoice')
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'productInvoiceInfo.get': function (msg, $meta) {
    return {
      firstName: 'merchant',
      lastName: 'one',
      amount: 25.00,
      currencyCode: 'USD',
      currencySymbol: '$',
      fee: 0.50,
      description: 'Prepaid voucher for phone'
    }
  }
}
