var joi = require('joi')
const STATUS_CODE_REJECT = 'r'
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoice.reject',
    path: '/invoices/reject',
    config: {
      description: 'Reject invoiceNotification by given invoiceNotificationId',
      notes: 'Get the invoiceNotification by given invoiceNotificationId',
      tags: ['api'],
      validate: {
        payload: joi.object({
          invoiceNotificationId: joi.string()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Action performed',
              schema: joi.object().keys({
                response: joi.string().description('Result of the call').example('Invoice has been rejected')
              })
            }
          }
        }
      }
    },
    method: 'put'
  },
  'invoice.reject': function (msg, $meta) {
    return this.bus.importMethod('transfer.invoiceNotification.edit')({
      invoiceNotificationId: msg.invoiceNotificationId,
      statusCode: STATUS_CODE_REJECT
    })
  }
}
