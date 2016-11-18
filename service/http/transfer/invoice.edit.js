var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.invoice.edit',
    path: '/receivers/invoices/{invoiceId}',
    config: {
      description: 'Approve an invoice transfer',
      notes: 'Approve an invoice transfer',
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
              schema: joi.object().keys({
                senderIdentifier: joi.string().description('Sender Identifier'),
                status: joi.string().description('Status')
              })
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
      statusCode: 'e'
    }, $meta)
  },
  'invoice.edit.response.receive': function (msg, $meta) {
    return this.config.receive(msg.payload.error ? msg : {
      payload: {
        result: {
          senderIdentifier: msg.payload.result.userNumber,
          status: msg.payload.result.status
        }
      }
    }, $meta)
  }
}
