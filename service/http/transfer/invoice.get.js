var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.invoice.get',
    path: '/receivers/invoices/{invoiceId}',
    config: {
      description: 'Add transfer notification',
      notes: 'Add transfer notification',
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
              schema: joi.any()
            }
          }
        }
      }
    },
    method: 'get'
  },
  'invoice.get.request.send': function (msg, $meta) {
    return this.config.send(msg, $meta)
  },
  'invoice.get.response.receive': function (msg, $meta) {
    return this.config.receive(msg, $meta)
  }
}
