var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.invoice.get',
    path: '/receivers/invoices/{invoiceId}',
    config: {
      description: 'Get information about an invoice',
      notes: 'Get information about an invoice',
      tags: ['api'],
      validate: {
        params: joi.object({
          invoiceId: joi.string().description('Invoice Id')
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
                userNumber: joi.string().description('User Number'),
                invoiceInfo: joi.string().description('Invoice Info')
              })
            }
          }
        }
      }
    },
    method: 'get'
  }
}