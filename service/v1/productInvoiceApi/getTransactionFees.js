var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'productInvoiceApi.transactionFees.get',
    path: '/v1/transactionFees/{productInvoiceId}',
    config: {
      description: 'Get the fees related to particular product invoice',
      notes: 'Get the fees related to particular product invoice',
      tags: ['api', 'productInvoice', 'v1', 'getTransactionFees'],
      validate: {
        params: joi.object({
          productInvoiceId: joi.string().description('Product incoice id').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice details',
              schema: joi.object().keys({
                amount: joi.number().description('Product invoice amount'),
                currencyCode: joi.string().description('Product invoice currency code'),
                currencySymbol: joi.string().description('Product invoice symbol'),
                fee: joi.number().description('Total fee amount')
              })
            }
          }
        }
      }
    },
    method: 'get'
  },
  'transactionFees.get': function (msg, $meta) {
    var invoiceDetails = {}
    var invoiceAmount = 25.00
    var invoice = {}
    invoice.currencyCode = 'USD'

    invoiceDetails.amount = invoiceAmount
    invoiceDetails.currencyCode = invoice.currencyCode
    invoiceDetails.currencySymbol = '$'
    return this.bus.importMethod('rule.decision.fetch')({
      currency: invoice.currencyCode,
      amount: invoiceAmount
    })
    .then(decisionResult => {
      invoiceDetails.fee = (decisionResult.fee && decisionResult.fee.amount) || 0
      return invoiceDetails
      // return this.bus.importMethod('spsp.rule.decision.fetch')({
      //   currency: invoice.currencyCode,
      //   amount: invoiceAmount,
      //   identifier: invoice.identifier
      // })
      // .then(spspDecisionResult => {
      //   if (spspDecisionResult.sourceAmount) {
      //     invoiceDetails.connectorFee = Math.round((spspDecisionResult.sourceAmount - invoiceAmount) * 100) / 100
      //   } else {
      //     invoiceDetails.connectorFee = 0
      //   }
      //   return invoiceDetails
      // })
      // .catch(e => {
      //   invoiceDetails.connectorFee = 0
      //   return invoiceDetails
      // })
    })
  }
}
