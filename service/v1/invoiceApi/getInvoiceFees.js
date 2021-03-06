var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'invoiceApi.invoiceFees.get',
    path: '/v1/invoiceFees/{invoiceUrl}/{identifier}/{account}',
    config: {
      description: 'Get the fees related to particular invoice',
      notes: 'Get the fees related to particular invoice',
      tags: ['api', 'v1', 'getInvoiceFees', 'invoiceApi'],
      validate: {
        params: joi.object({
          invoiceUrl: joi.string().description('Invoice URL').example('http://localhost:8010/receivers/invoices/1').required(),
          identifier: joi.string().description('Payer identifier').example('17500419').required(),
          account: joi.string().description('Payer account number').example('bob').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice details',
              schema: joi.object().keys({
                fee: joi.number().description('Total fee amount'),
                connectorFee: joi.number().description('Total connector fee amount')
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'invoiceFees.get': function (msg, $meta) {
    return this.bus.importMethod('spsp.transfer.invoice.get')({
      receiver: msg.invoiceUrl
    })
    .then((invoice) => {
      // type, invoiceId, account, name, currencyCode, currencySymbol, amount, status, invoiceType, merchantIdentifier, invoiceInfo
      return this.bus.importMethod('ledger.account.get')({
        accountNumber: msg.account
      })
      .then((ledgerAccount) => {
        return this.bus.importMethod('rule.decision.fetch')({
          currency: invoice.currencyCode,
          amount: Number(invoice.amount),
          destinationIdentifier: invoice.merchantIdentifier,
          destinationAccount: msg.invoiceUrl,
          sourceAccount: ledgerAccount.id,
          sourceIdentifier: msg.identifier,
          transferType: 'invoice'
        })
      })
    })
    .then((rule) => {
      return {
        fee: (rule.fee && rule.fee.amount) || 0,
        connectorFee: rule.connectorFee
      }
    })
  }
}
