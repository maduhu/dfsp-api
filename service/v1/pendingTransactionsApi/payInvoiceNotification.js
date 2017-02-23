var joi = require('joi')
const INVOICE_TRANSFER_CODE = 'invoice'
const STATUS_CODE_EXECUTE = 'e'
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoiceNotification.pay',
    path: '/v1/invoiceNotifications/pay',
    config: {
      description: 'Pay invoiceNotification by given invoiceNotificationId',
      notes: 'Pay the invoiceNotification by given invoiceNotificationId',
      tags: ['api', 'pendingTransactions', 'v1', 'invoiceNotifications', 'payInvoiceNotification'],
      validate: {
        payload: joi.object({
          account: joi.string().description('Client\'s account').example('client').required(),
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
                status: joi.string().description('The new invoice notification status').example('paid')
              })
            }
          }
        }
      }
    },
    method: 'put'
  },
  'invoiceNotification.pay': function (msg) {
    return this.bus.importMethod('ledger.account.get')({
      accountNumber: msg.account
    })
    .then((ledgerResult) => {
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
                    sourceAccount: ledgerResult.id,
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
                    status: response.status === 'executed' ? 'paid' : response.status
                  }
                })
            })
        })
    })
  }
}
