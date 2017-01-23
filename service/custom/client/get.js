var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'client.get',
    path: '/client/{clientNumber}',
    config: {
      description: 'Lookup default account for a given end user number',
      notes: 'It will check in the central directory to find information about the user',
      tags: ['api'],
      validate: {
        params: joi.object({
          clientNumber: joi.string().description('Client number')
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Client information',
              schema: joi.object().keys({
                account: joi.string()
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'get': function (msg, $meta) {
    var params = {
      identifier: msg.clientNumber
    }
    return this.bus.importMethod('spsp.transfer.payee.get')(params, $meta)
    .then(res => ({
      ilpAccount: res.account
    }))
  }
}
