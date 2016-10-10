var joi = require('joi')
var util = require('../util')
module.exports = {
  start: function () {
    if (!this.registerRequestHandler) {
      return
    }
    var routes = [{
      rpc: 'account.account.get',
      path: '/account/get/{accountNumber}',
      reply: (reply, response, $meta) => {
        if (!response.error) {
          return reply(response, {
            'content-type': 'application/json'
          }, 201)
        }

        return reply({
          id: response.error.type,
          message: response.error.message
        }, {
          'content-type': 'application/json'
        }, response.debug.statusCode || 400)
      },
      config: {
        description: 'Get account info',
        notes: 'Obtains information about what actor is associated with a certain account',
        tags: ['api'],
        validate: {
          params: joi.object({
            accountNumber: joi.string().description('Account Number')
          }),
          failAction: util.validationFailHandler
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
    }].map((route) => {
      return {
        method: route.method,
        path: route.path,
        handler: (request, reply) => util.rest.call(this, request, reply, route.rpc, route.reply),
        config: Object.assign({
          auth: false
        }, route.config)
      }
    })
    this.registerRequestHandler(routes)
  },
  'account.get.request.send': function (msg, $meta) {
    return this.config.send(msg, $meta)
  },
  'account.get.response.receive': function (msg, $meta) {
    return this.config.receive(msg, $meta)
  }
}
