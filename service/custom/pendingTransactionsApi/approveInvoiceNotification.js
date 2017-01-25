var joi = require('joi')
const INVOICE_TRANSFER_CODE = 'invoice'
const STATUS_CODE_EXECUTE = 'e'
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoice.approve',
    path: '/invoices/approve',
    config: {
      description: 'Approve invoiceNotification by given invoiceNotificationId',
      notes: 'Approve the invoiceNotification by given invoiceNotificationId',
      tags: ['api'],
      validate: {
        payload: joi.object({
          account: joi.string(),
          invoiceNotificationId: joi.string().description('Invoice notification Id').example('6')
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Action performed',
              schema: joi.object().keys({
                response: joi.string().description('Result of the call').example('Invoice has been approved')
              })
            }
          }
        }
      }
    },
    method: 'put'
  },
  'invoice.approve': function (msg, $meta) {
    var userNumber
    return this.bus.importMethod('transfer.invoiceNotification.get')({
      invoiceNotificationId: msg.invoiceNotificationId
    })
      .then((result) => {
        userNumber = result.userNumber
        return this.bus.importMethod('pendingTransactionsApi.invoice.get')({
          invoiceUrl: result.invoiceUrl
        })
      })
      .then((result) => {
        return this.bus.importMethod('transfer.push.execute')({
          sourceIdentifier: userNumber,
          sourceAccount: msg.account,
          receiver: msg.invoiceUrl,
          destinationAmount: result.amount,
          currency: result.currencyCode,
          memo: JSON.stringify({
            fee: result.fee,
            transferCode: INVOICE_TRANSFER_CODE,
            debitName: '',
            creditName: result.name
          })
        })
      })
      .then((result) => {
        return this.bus.importMethod('transfer.invoiceNotification.edit')({
          invoiceNotificationId: msg.invoiceNotificationId,
          statusCode: STATUS_CODE_EXECUTE
        })
      })
  }
}
