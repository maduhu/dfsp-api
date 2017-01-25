var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoice.get',
    path: '/v1/invoices/details/{invoiceUrl}',
    config: {
      description: 'Get the invoice details by given invoice URL',
      notes: 'Get the invoice details by given invoice URL',
      tags: ['api', 'pendingTransactions', 'v1'],
      validate: {
        params: joi.object({
          invoiceUrl: joi.string().description('Invoice URL').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice details',
              schema: joi.object().keys({
                address: joi.string().description('Invoice address'),
                name: joi.string().description('Invoice account holder name'),
                amount: joi.number().description('Invoice amount'),
                currencyCode: joi.string().description('Invoice currency code'),
                currencySymbol: joi.string().description('Invoice symbol'),
                imageUrl: joi.string().description("User's profile image URL"),
                fee: joi.number().description('Local fee amount'),
                connectorFee: joi.number().description('Connector fee')
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'invoice.get': function (msg, $meta) {
    var invoiceDetails = {}
    return this.bus.importMethod('spsp.transfer.invoice.get')({
      receiver: msg.invoiceUrl
    })
      .then((invoice) => {
        var invoiceAmount = Number(invoice.amount)
        invoiceDetails.address = invoice.address
        invoiceDetails.currencyCode = invoice.currencyCode
        invoiceDetails.currencySymbol = invoice.currencySymbol
        invoiceDetails.imageUrl = invoice.imageUrl
        invoiceDetails.name = invoice.name
        invoiceDetails.type = invoice.type
        invoiceDetails.amount = invoiceAmount
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
                return invoiceDetails
              })
              .catch(e => {
                invoiceDetails.connectorFee = 0
                return invoiceDetails
              })
          })
      })
  }
}