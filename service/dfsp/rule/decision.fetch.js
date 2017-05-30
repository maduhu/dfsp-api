// joi.object().keys({
//   transferId: joi.string().required().regex(/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/).example('3a2a1d9e-8640-4d2d-b06c-84f2cd613300').description('The UUID for the local transfer'),
//   payer: joi.object().keys({
//     identifier: joi.string().required().example('92806391'),
//     identifierType: joi.string().required().example('eur')
//   }).required(),
//   payee: joi.object().keys({
//     identifier: joi.string().required().example('30754016'),
//     identifierType: joi.string().required().example('eur')
//   }).required(),
//   transferType: joi.string().required().example('p2p'),
//   amountType: joi.string().required().valid(['SEND', 'RECEIVE']).example('SEND'),
//   amount: joi.object().keys({
//     amount: joi.string().required().example('10'),
//     currency: joi.string().required().example('USD')
//   }).required(),
//   fees: joi.object().keys({
//     amount: joi.string().required().example('0.25'),
//     currency: joi.string().required().example('USD')
//   }).required()
// }).unknown().required()
var error = require('./errors')
var uuid = require('uuid/v4')

function ruleDecisionFetch (msg, $meta) {
  return this.bus.importMethod('ledger.transferType.fetch')({})
    .then((transferTypes) => {
      return this.config.exec.call(this, {
        currency: msg.amount.currency,
        amount: msg.amount.amount,
        operationId: transferTypes.find((el) => el.transferCode === msg.transferType).transferTypeId
      }, $meta)
    })
    .then((rule) => {
      return this.bus.importMethod('ledger.transfer.fetch')({
        transferType: msg.transferType,
        debitIdentifier: msg.payer.identifier,
        currency: msg.amount.currency
      })
      .then((transfers) => {
        // decisions, decisions...
        if (rule.limit.minAmount && msg.amount.amount < rule.limit.minAmount) {
          throw error.minAmount({ limit: rule.limit.minAmount })
        }
        if (rule.limit.maxAmount && msg.amount.amount > rule.limit.maxAmount) {
          throw error.maxAmount({limit: rule.limit.maxAmount})
        }
        if (rule.limit.maxAmountDaily && +transfers.amountDaily + +msg.amount.amount > rule.limit.maxAmountDaily) {
          throw error.maxAmountDaily({ limit: rule.limit.maxAmountDaily })
        }
        if (rule.limit.maxCountDaily && transfers.countDaily >= rule.limit.maxCountDaily) {
          throw error.maxCountDaily({ limit: rule.limit.maxCountDaily })
        }
        if (rule.limit.maxAmountWeekly && +transfers.amountWeekly + +msg.amount.amount > rule.limit.maxAmountWeekly) {
          throw error.maxAmountWeekly({ limit: rule.limit.maxAmountWeekly })
        }
        if (rule.limit.maxCountWeekly && transfers.countWeekly >= rule.limit.maxCountWeekly) {
          throw error.maxCountWeekly({ limit: rule.limit.maxCountWeekly })
        }
        if (rule.limit.maxAmountMonthly && +transfers.amountMonthly + +msg.amount.amount > rule.limit.maxAmountMonthly) {
          throw error.maxAmountMonthly({ limit: rule.limit.maxAmountMonthly })
        }
        if (rule.limit.maxCountMonthly && transfers.countMonthly >= rule.limit.maxCountMonthly) {
          throw error.maxCountMonthly({ limit: rule.limit.maxCountMonthly })
        }
        return rule
      })
    })
}

module.exports = {
  'decision.fetch': function (msg, $meta) {
    // joi.object().keys({
    //     payer: joi.object().keys({
    //       identifier: joi.string().required().example('92806391'),
    //       identifierType: joi.string().required().example('eur')
    //     }).required(),
    //     payee: joi.object().keys({
    //       identifier: joi.string().required().example('30754016'),
    //       identifierType: joi.string().required().example('eur')
    //     }).required(),
    //     transferType: joi.string().required().example('p2p'),
    //     amountType: joi.string().required().valid(['SEND', 'RECEIVE']).example('SEND'),
    //     amount: joi.object().keys({
    //       amount: joi.string().required().example('10'),
    //       currency: joi.string().required().example('USD')
    //     }).required(),
    //   }).unknown()
    // }
    if (msg.amountType === 'SEND') {
      return ruleDecisionFetch.apply(this, arguments)
        .then((rule) => {
          msg.transferId = uuid()
          msg.fees = {
            amount: rule.fee.amount,
            currency: msg.amount.currency
          }
          return this.bus.importMethod('dfsp/ledger.quote.add')({
            transferId: msg.transferId,
            fee: rule.fee.amount,
            commission: rule.commission.amount,
            isDebit: true
          })
        })
        .then(() => {
          return this.bus.importMethod('spsp.transfer.quote.add')(msg)
        })
    } else if (msg.amountType === 'RECEIVE') {
      msg.transferId = uuid()
      return this.bus.importMethod('spsp.transfer.quote.add')(msg)
        .then(() => {
          // result
          //  {
          //     "transferId": "110ec58a-a0f2-4ac4-8393-c866d813b8d1",
          //     "receiveAmount": {
          //       "amount": "9.25",
          //       "currency": "USD"
          //     },
          //     "payeeFee": {
          //       "amount": "1",
          //       "currency": "USD"
          //     },
          //     "payeeCommission": {
          //       "amount": "1",
          //       "currency": "USD"
          //     },
          //     "ipr": "c29tZSBpcHIgaGVyZQ=="
          // }
          return ruleDecisionFetch.apply(this, arguments)
        })
        .then((rule) => {
          return this.bus.importMethod('dfsp/ledger.quote.add')({
            transferId: msg.transferId,
            fee: rule.fee.amount,
            commission: rule.commission.amount,
            isDebit: true
          })
        })
    } else {
      throw error.incorrectAmountType({ amountType: msg.amountType })
    }
  }
}
