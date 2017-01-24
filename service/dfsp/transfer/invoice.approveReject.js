var joi = require('joi')
const ACTION_APPROVE = 'approve'
const ACTION_REJECT = 'reject'
module.exports = {
  rest: {
    rpc: 'transfer.invoice.approveReject',
    path: '/invoices/approveReject',
    config: {
      description: 'Approve/reject invoice by given invoice URL',
      notes: 'Get the invoice details by given invoice URL',
      tags: ['api'],
      validate: {
        payload: joi.object({
          invoiceUrl: joi.string().description('Invoice URL').example('http://ec2-35-163-249-3.us-west-2.compute.amazonaws.com:8014/ledger/accounts/merchant'),
          action: joi.string().description('Action to perform').example('approve')
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
  'invoice.approveReject': function (msg, $meta) {
    var invoiceDetails = {}
    return this.bus.importMethod('spsp.transfer.invoice.get')({
      receiver: msg.invoiceUrl
    })
      .then((invoice) => {
        var invoiceAmount = Number(invoice.amount)
        invoiceDetails.currencyCode = invoice.currencyCode
        invoiceDetails.name = invoice.name
        invoiceDetails.type = invoice.type
        invoiceDetails.amoun = invoiceAmount
        return this.bus.importMethod('rule.decision.fetch')({
          currency: invoice.currencyCode,
          amount: invoiceAmount
        })
          .then(decisionResult => {
            invoiceDetails.fee = decisionResult.fee && decisionResult.fee.amount || 0
            return this.bus.importMethod('spsp.rule.decision.fetch')({
              currency: invoice.currencyCode,
              amount: invoiceAmount,
              identifier: invoice.userNumber
            })
              .then(spspDecisionResult => {
                if (spspDecisionResult.sourceAmount) {
                  invoiceDetails.connectorFee = Math.round((spspDecisionResult.sourceAmount - invoiceAmount) * 100) / 100
                } else {
                  invoiceDetails.connectorFee = 0
                }
              })
              .then(finalResult => {
                switch (msg.action) {
                  case ACTION_REJECT:
                    return this.bus.importMethod('transfer.invoiceNotification.edit')({
                      invoiceNotificationId: params.pendingTransaction.invoiceNotificationId,
                      statusCode: 'r'
                    })
                      .then(() => {
                        return { response: 'Invoice has been rejected' }
                      })
                  case ACTION_APPROVE:
                    return this.bus.importMethod('transfer.push.execute')({
                      sourceIdentifier: userNumber,
                      sourceAccount: sourceAccount, // "sourceAccount": "http://localhost:8014/ledger/accounts/alice21",
                      receiver: invoiceDetails.receiver, // pendingTransaction.invoiceUrl
                      destinationAmount: invoiceDetails.amount, // transaction amount
                      currency: invoiceDetails.currencyCode, //transaction currencyCode
                      memo: JSON.stringify({
                        fee: invoiceDetails.fee,
                        transferCode: 'invoice',
                        debitName: params.user.name,
                        creditName: params.pendingTransaction.name
                      })
                    })
                      .then((result) => {
                        params.pendingTransaction.fulfillment = result.fulfillment
                        params.pendingTransaction.status = result.status
                        return this.bus.importMethod('transfer.invoiceNotification.edit')({
                          invoiceNotificationId: params.pendingTransaction.invoiceNotificationId, //TODO
                          statusCode: 'e'
                        })
                          .then(result => { response: 'Invoice has been approved' })
                      })
                  default:
                    return { response: 'Unknown input action' }
                }
              })
              .catch(e => {
                invoiceDetails.connectorFee = 0
                return invoiceDetails
              })
          })
      })
  }
}
