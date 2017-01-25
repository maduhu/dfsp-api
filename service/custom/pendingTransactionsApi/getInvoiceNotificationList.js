var joi = require('joi')
const PENDING_TRANSACTIONS_STATUS = 'p'
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoiceNotification.fetch',
    path: '/invoices/pending/{userNumber}',
    config: {
      description: 'Get the list with invoice notifications for a given user',
      notes: 'Get all the pending invoice notifications for a given user',
      tags: ['api'],
      validate: {
        params: joi.object({
          userNumber: joi.string().description('User number')
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'List invoices',
              schema: joi.object().keys({
                invoices: joi.array().items(
                  {
                    invoiceNotificationId: joi.number().description('Invoice identification number'),
                    invoiceUrl: joi.string().description('Invoice URL'),
                    userNumber: joi.string().description('User number of the invoice owner'),
                    status: joi.string().description('Invoice status'),
                    memo: joi.string().description('Memo/notes')
                  }
                )
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'invoiceNotification.fetch': function (msg, $meta) {
    return this.bus.importMethod('transfer.invoiceNotification.fetch')({
      userNumber: msg.userNumber,
      statusCode: PENDING_TRANSACTIONS_STATUS
    })
    .then((resultList) => {
      if (Array.isArray(resultList) && resultList.length) {
        return {invoices: resultList}
      }
      return {invoices: []}
    })
  }
}
