var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.invoiceNotification.add',
    path: '/invoices',
    reply: (reply, response, $meta) => {
      if (!response.error) {
        return reply(null, null, 201)
      }
      return reply({
        id: response.error.type,
        message: response.error.message
      }, {
        'content-type': 'application/json'
      }, (response.debug && response.debug.statusCode) || 400)
    },
    config: {
      description: 'Add invoice notification',
      notes: 'Add invoice notification',
      tags: ['api'],
      validate: {
        payload: joi.object({
          invoiceUrl: joi.string().description('Invoice URL'),
          senderIdentifier: joi.string().description('Client userNumber'),
          memo: joi.string().description('memo')
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Invoice notification added successfully',
              schema: joi.any()
            }
          }
        }
      }
    },
    method: 'post'
  },
  'invoiceNotification.add.request.send': function (msg, $meta) {
    return this.config.send({
      invoiceUrl: msg.invoiceUrl,
      userNumber: msg.senderIdentifier,
      memo: msg.memo
    }, $meta)
  },
  'invoiceNotification.add.response.receive': function (msg, $meta) {
    return this.config.receive(msg, $meta)
  }
}
