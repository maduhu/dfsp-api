var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.client.get',
    path: '/v1/invoices/client/{userNumber}',
    config: {
      description: 'Lookup default account for a given end user number',
      notes: 'It will check in the central directory to find information about the user',
      tags: ['api', 'pendingTransactions', 'v1'],
      validate: {
        params: joi.object({
          userNumber: joi.number().description('End user number').example(26547070).required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Client information',
              schema: joi.object({
                firstName: joi.string().description('Client first name'),
                lastName: joi.string().description('Client last name'),
                imageUrl: joi.string().description('Image URL')
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'client.get': function (msg, $meta) {
    return this.bus.importMethod('payee.get')({
      payee: '' + msg.userNumber
    }, $meta)
      .catch((e) => {
        return this.bus.importMethod('spsp.transfer.payee.get')({
          identifier: msg.userNumber
        }, $meta)
      })
      .then(res => {
        return {
          firstName: res.name,
          lastName: 'Smith',
          imageUrl: res.imageUrl
        }
      })
  }
}
