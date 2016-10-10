var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'account.account.get',
    path: '/account/get/{accountNumber}',
    reply: (reply, response, $meta) => {
      if (!response.error) {
        return reply(response, {
          'content-type': 'application/json'
        }, 200)
      }

      return reply({
        id: response.error.type,
        message: response.error.message
      }, {
        'content-type': 'application/json'
      }, (response.debug && response.debug.statusCode) || 400)
    },
    config: {
      description: 'Get account info',
      notes: 'Obtains information about what actor is associated with a certain account',
      tags: ['api'],
      validate: {
        params: joi.object({
          accountNumber: joi.string().description('Account Number')
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
  hooks: {
    'account.get.request.send': function (msg, $meta) {
      return this.config.send(msg, $meta)
    },
    'account.get.response.receive': function (msg, $meta) {
      return this.config.receive(msg, $meta)
    }
  }
}
