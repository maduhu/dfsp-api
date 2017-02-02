var joi = require('joi')
const INVOICE_TRANSFER_CODE = 'invoice'
const STATUS_CODE_EXECUTE = 'e'
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoiceNotification.approve',
    path: '/v1/invoiceNotifications/approve',
    config: {
      description: 'Approve invoiceNotification by given invoiceNotificationId',
      notes: 'Approve the invoiceNotification by given invoiceNotificationId',
      tags: ['api', 'pendingTransactions', 'v1', 'invoiceNotifications', 'approveInvoiceNotification'],
      validate: {
        payload: joi.object({
          account: joi.string().description('Merchant\'s account').example('merchant').required(),
          invoiceNotificationId: joi.string().description('Invoice notification Id').example('6').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Action performed',
              schema: joi.object().keys({
                invoiceNotificationId: joi.string().description('Invoice notification Id').example('6'),
                status: joi.string().description('The new invoice notification status').example('approved')
              })
            }
          }
        }
      }
    },
    method: 'put'
  },
  'invoiceNotification.approve': function (msg) {
    return this.bus.importMethod('transfer.invoiceNotification.get')({
      invoiceNotificationId: msg.invoiceNotificationId
    })
      .then((invoiceNotificationResult) => {
        return this.bus.importMethod('pendingTransactionsApi.invoiceNotification.get')({
          invoiceNotificationId: msg.invoiceNotificationId
        })
          .then((invoiceResult) => {
            return this.bus.importMethod('directory.user.get')({
              userNumber: invoiceNotificationResult.userNumber
            })
              .then((directoryResult) => {
                return this.bus.importMethod('transfer.push.execute')({
                  sourceIdentifier: invoiceNotificationResult.userNumber,
                  sourceAccount: msg.account,
                  receiver: invoiceNotificationResult.invoiceUrl,
                  destinationAmount: '' + invoiceResult.amount,
                  currency: invoiceResult.currencyCode,
                  memo: JSON.stringify({
                    fee: invoiceResult.fee,
                    transferCode: INVOICE_TRANSFER_CODE,
                    debitName: directoryResult.name,
                    creditName: invoiceResult.name
                  })
                })
              })
          })
          .then((result) => {
            return this.bus.importMethod('transfer.invoiceNotification.edit')({
              invoiceNotificationId: msg.invoiceNotificationId,
              statusCode: STATUS_CODE_EXECUTE
            })
              .then((response) => {
                return {
                  invoiceNotificationId: response.invoiceNotificationId,
                  status: response.status
                }
              })
          })
      })
  }
}
