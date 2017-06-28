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
          paymentId: joi.string().required().regex(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/).example('3a2a1d9e-8640-4d2d-b06c-84f2cd613300').description('The UUID for the local transfer'),
          payer: joi.object().keys({
            identifier: joi.string().required().example('92806391'),
            identifierType: joi.string().required().example('eur')
          }).required(),
          payee: joi.object().keys({
            identifier: joi.string().required().example('30754016'),
            identifierType: joi.string().required().example('eur'),
            account: joi.string().required().example('http://host/ledger/accounts/alice')
          }).required(),
          transferType: joi.string().required().example('p2p'),
          amountType: joi.string().required().valid(['SEND', 'RECEIVE']).example('SEND'),
          amount: joi.object().keys({
            amount: joi.string().required().example('10'),
            currency: joi.string().required().example('USD')
          }).required(),
          fees: joi.object().keys({
            amount: joi.string().example('0.25'),
            currency: joi.string().example('USD')
          }).optional()
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
        return this.bus.importMethod('dfsp/rule.decision.fetch')({
          currency: msg.amount.currency,
          amount: msg.amount.amount,
          operationId: transferTypes.find((el) => el.transferCode === msg.transferType).transferTypeId
        })
      })
      .then((rule) => {
        let fee = 0 // rule.fee.amount
        let commission = (msg.transferType === 'cashOut') ? rule.commission.amount : 0 // debit receives commission only in case of cashOut
        if (msg.amountType === 'SEND') {
          msg.amount.amount = Number(msg.amount.amount) - fee
        }
        return this.config.exec.call(this, {
          paymentId: msg.paymentId,
          identifier: msg.payee.identifier,
          identifierType: msg.payee.identifierType,
          destinationAccount: msg.payee.account,
          currency: msg.amount.currency,
          fee: fee,
          commission: commission,
          transferType: msg.transferType,
          amount: msg.amount.amount,
          isDebit: false
        }, $meta)
        .then((quote) => {
          return {
            paymentId: msg.paymentId,
            expiresAt: quote.expiresAt,
            payeeFee: {
              amount: fee,
              currency: msg.amount.currency
            },
            payeeCommission: {
              amount: 0,
              currency: msg.amount.currency
            }
          }
        })
      })
  }
}
