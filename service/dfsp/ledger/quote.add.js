var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'ledger.quote.add',
    path: '/quotes',
    config: {
      description: 'Reserve a quote',
      notes: 'Reserve a quote',
      tags: ['api'],
      validate: {
        params: joi.any(),
        payload: joi.object().keys({
          transferId: joi.string().required().regex(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/).example('3a2a1d9e-8640-4d2d-b06c-84f2cd613300').description('The UUID for the local transfer'),
          payer: joi.object().keys({
            identifier: joi.string().required().example('92806391'),
            identifierType: joi.string().required().example('eur')
          }).required(),
          payee: joi.object().keys({
            identifier: joi.string().required().example('30754016'),
            identifierType: joi.string().required().example('eur')
          }).required(),
          transferType: joi.string().required().example('p2p'),
          amountType: joi.string().required().valid(['SEND', 'RECEIVE']).example('SEND'),
          amount: joi.object().keys({
            amount: joi.string().required().example('10'),
            currency: joi.string().required().example('USD')
          }).required(),
          fees: joi.object().keys({
            amount: joi.string().required().example('0.25'),
            currency: joi.string().required().example('USD')
          }).required()
        }).unknown().required()
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice notification submited',
              schema: joi.string()
            }
          }
        }
      }
    },
    method: 'post'
  },
  'quote.add': function (msg, $meta) {
    return this.bus.importMethod('ledger.transferType.fetch')({})
      .then((transferTypes) => {
        return this.bus.importMethod('rule.decision.fetch')({
          currency: msg.amount.currency,
          amount: msg.amount.amount,
          operationId: transferTypes.find((el) => el.transferCode === msg.transferType).transferTypeId
        }, $meta)
      })
      .then((rule) => {
        let fee = 0
        let commission = msg.transferType === 'cashOut' ? (rule.commisssion.amount || 0) : 0
        return this.config.exec.call(this, {
          transferId: msg.transferId,
          fee: fee,
          commission: commission,
          isDebit: false
        })
        .then(() => {
          return {
            transferId: msg.transferId,
            payeeFee: {
              amount: fee,
              currency: msg.amount.currency
            },
            payeeCommission: {
              amount: commission,
              currency: msg.amount.currency
            }
          }
        })
      })
  }
}
