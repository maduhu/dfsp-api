var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.invoice.edit',
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
              description: 'Invoice approved',
              schema: joi.any()
            }
          }
        }
      }
    },
    method: 'put'
  },
  'invoice.edit.request.send': function (msg, $meta) {
    return this.config.send({
      invoiceId: msg.invoiceId,
      status: 'a'
    }, $meta)
  },
  'invoice.edit.response.receive': function (msg, $meta) {
    return this.config.receive({
      payload: {
        result: {
          senderIdentifier: msg.payload.result.userNumber,
          status: 'executed'
        }
      }
    }, $meta)
  }
}
