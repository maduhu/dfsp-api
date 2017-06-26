var joi = require('joi')

module.exports = {
  rest: {
    rpc: 'rule.quote.get',
    path: '/quote',
    config: {
      description: 'Get quote',
      notes: 'Get quote',
      tags: ['api', 'spsp-server-backend'],
      validate: {
        payload: joi.object({
          currency: joi.string().example('USD').required(),
          amount: joi.string().example('42').required(),
          destinationIdentifier: joi.string().example('alice').required(),
          sourceAccount: joi.string().example('bob').required(),
          sourceIdentifier: joi.string().example('bob').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '201': {
              description: 'Quote successful',
              schema: joi.any()
            }
          }
        }
      }
    },
    method: 'post'
  },
  'quote.get': function (params, $meta) {
    return this.bus.importMethod('spsp.transfer.payee.get')({
      identifier: params.destinationIdentifier
    })
    .then((result) => {
      return this.bus.importMethod('rule.decision.fetch')({
        currency: params.currency,
        amount: params.amount,
        destinationIdentifier: params.destinationIdentifier,
        destinationAccount: result.spspServer + '/receivers/' + params.destinationIdentifier,
        spspServer: result.spspServer,
        sourceAccount: params.sourceAccount,
        sourceIdentifier: params.sourceIdentifier,
        transferType: 'p2p'
      })
      .then((result) => {
        return {
          transferId: result.transferId,
          fee: result.fee,
          commission: result.commission
        }
      })
    })
  }
}