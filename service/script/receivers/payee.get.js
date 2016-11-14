var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'receivers.payee.get',
    path: '/receivers/{payee}',
    config: {
      description: 'Get account info',
      notes: 'Obtains information about what actor is associated with a certain account',
      tags: ['api'],
      validate: {
        params: joi.object({
          payee: joi.string().description('Account Number')
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Account information was obtained successfully',
              schema: joi.object({
                accountNumber: joi.string(),
                actorId: joi.string()
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'payee.get': function (msg, $meta) {
    return this.bus.importMethod('ledger.account.get')({
        accountNumber: '000000001'
    })
  }
}
