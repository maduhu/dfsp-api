var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'invoiceApi.merchant.get',
    path: '/v1/merchant/{identifier}',
    config: {
      description: 'Lookup default account for a given identifier',
      notes: 'It will check in the central directory to find information about the user',
      tags: ['api', 'v1', 'getMerchant', 'invoiceApi'],
      validate: {
        params: joi.object({
          identifier: joi.number().description('Identifier').example(26547070).required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Merchant information',
              schema: joi.object({
                account: joi.string().description('Url to the merchant\'s account'),
                address: joi.string().description('Merchant\'s dfsp address'),
                firstName: joi.string().description('Merchant first name'),
                lastName: joi.string().description('Merchant last name'),
                currencyCode: joi.string().description('Merchant\'s currency'),
                currencySymbol: joi.string().description('Merchant\'s currency representation with symbol'),
                spspServer: joi.string().description('Merchant\'s spsp server')
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'merchant.get': function (msg) {
    return this.bus.importMethod('spsp.transfer.payee.get')({
      identifier: msg.identifier
    })
    .then(res => {
      return {
        account: res.account,
        address: res.address,
        firstName: res.firstName,
        lastName: res.lastName,
        currencyCode: res.currencyCode,
        currencySymbol: res.currencySymbol,
        spspServer: res.spspServer
      }
    })
  }
}
