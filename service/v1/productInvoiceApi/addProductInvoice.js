var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'productInvoiceApi.productInvoice.add',
    path: '/v1/productInvoice/add',
    config: {
      description: 'Add a product invoice',
      notes: 'Add a product invoice',
      tags: ['api', 'productInvoice', 'v1', 'productInvoiceAdd'],
      validate: {
        payload: joi.object({
          account: joi.string().description('Merchant account').example('merchant').required(),
          amount: joi.number().description('Amount').example(25.00).required(),
          merchantIdentifier: joi.string().description('Merchant identifier').example('78956562').required(),
          info: joi.string().description('Product invoice description').example('Invoice in the amount of $25 for prepaid TV').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Product invoice added',
              schema: joi.object().keys({
                productInvoiceId: joi.number().description('Product invoice Id'),
                currencyCode: joi.string().description('Currency code'),
                currencySymbol: joi.string().description('Currency symbol'),
                amount: joi.string().description('Amount'),
                status: joi.string().description('Status'),
                info: joi.string().description('Info')
              })
            }
          }
        }
      }
    },
    method: 'post'
  },
  'productInvoice.add': function (msg, $meta) {
    return {
      productInvoiceId: 1,
      currencyCode: 'USD',
      currencySymbol: '$',
      amount: '25.00',
      status: 'New',
      info: 'Invoice in the amount of $25 for prepaid TV'
    }
  }
}
