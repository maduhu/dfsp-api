var joi = require('joi')
module.exports = {
  _rest: { // remove underscore to enable rest route
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
  'invoice.edit': function (msg, $meta) {
    return this.config.exec({
      invoiceId: msg.invoiceId,
      statusCode: 'e'
    }, $meta)
      .then((result) => {
        return {
          senderIdentifier: result.userNumber,
          status: result.status
        }
      })
  }
}
