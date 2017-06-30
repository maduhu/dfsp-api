var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.transfer.execute',
    path: '/transfer',
    config: {
      description: 'Push new transfer',
      notes: 'Push new transfer',
      tags: ['api', 'spsp-server-backend'],
      validate: {
        payload: joi.object({
          paymentId: joi.string().example('8cfc0989-8401-46fe-96e3-aeed1070e1c6').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Transfer successful',
              schema: joi.any()
            }
          }
        }
      }
    },
    method: 'post'
  },
  'transfer.execute': function (msg, $meta) {
    return this.bus.importMethod('ledger.quote.get')({
      paymentId: msg.paymentId,
      isDebit: true
    })
    .then((res) => {
      return this.bus.importMethod('spsp.transfer.payee.get')({
        identifier: res.identifier
      })
      .then((result) => {
        return this.bus.importMethod('transfer.push.execute')({
          paymentId: msg.paymentId,
          sourceIdentifier: res.identifier,
          sourceAccount: result.account,
          receiver: res.receiver,
          destinationAmount: res.amount,
          currency: res.currencyId,
          fee: res.fee,
          transferType: 'p2p',
          ipr: res.ipr,
          sourceExpiryDuration: res.sourceExpiryDuration,
          connectorAccount: res.connectorAccount,
        })
        .then((result) => {
          return {
            fulfillment: result.fulfillment,
            status: result.status
          }
        })
      })
    })
  }
}
