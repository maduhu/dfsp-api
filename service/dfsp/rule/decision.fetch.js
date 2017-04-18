var error = require('./errors')
module.exports = {
  //     currency: params.transfer.destinationCurrency,
  //     amount: params.transfer.destinationAmount,
  //     destinationIdentifier: params.transfer.identifier,
  //     destinationAccount: params.transfer.destinationAccount,
  //     sourceAccount: params.user.sourceAccountName,
  //     sourceIdentifier: params.user.identifier,
  //     transferType: 'p2p'
  'decision.fetch': function (msg, $meta) {
    return this.bus.importMethod('ledger.transferType.fetch')({})
      .then((transferTypes) => {
        return this.config.exec.call(this, {
          currency: msg.currency,
          amount: msg.amount,
          operationId: transferTypes.find((el) => el.transferCode === msg.transferType).transferTypeId
        }, $meta)
          .then((rule) => {
            return this.bus.importMethod('ledger.transfer.fetch')({
              transferType: msg.transferType,
              debitIdentifier: msg.sourceIdentifier,
              currency: msg.currency
            })
              .then((transfers) => {
                // decisions, decisions...
                if (rule.limit.minAmount && msg.amount < rule.limit.minAmount) {
                  throw error.minAmount({ limit: rule.limit.minAmount })
                }
                if (rule.limit.maxAmount && msg.amount > rule.limit.maxAmount) {
                  throw error.maxAmount({limit: rule.limit.maxAmount})
                }
                if (rule.limit.maxAmountDaily && +transfers.amountDaily + +msg.amount > rule.limit.maxAmountDaily) {
                  throw error.maxAmountDaily({ limit: rule.limit.maxAmountDaily })
                }
                if (rule.limit.maxCountDaily && transfers.countDaily >= rule.limit.maxCountDaily) {
                  throw error.maxCountDaily({ limit: rule.limit.maxCountDaily })
                }
                if (rule.limit.maxAmountWeekly && +transfers.amountWeekly + +msg.amount > rule.limit.maxAmountWeekly) {
                  throw error.maxAmountWeekly({ limit: rule.limit.maxAmountWeekly })
                }
                if (rule.limit.maxCountWeekly && transfers.countWeekly >= rule.limit.maxCountWeekly) {
                  throw error.maxCountWeekly({ limit: rule.limit.maxCountWeekly })
                }
                if (rule.limit.maxAmountMonthly && +transfers.amountMonthly + +msg.amount > rule.limit.maxAmountMonthly) {
                  throw error.maxAmountMonthly({ limit: rule.limit.maxAmountMonthly })
                }
                if (rule.limit.maxCountMonthly && transfers.countMonthly >= rule.limit.maxCountMonthly) {
                  throw error.maxCountMonthly({ limit: rule.limit.maxCountMonthly })
                }
                return this.bus.importMethod('spsp.rule.decision.fetch')({
                  amount: msg.amount,
                  destinationIdentifier: msg.destinationIdentifier
                })
                  .then(result => {
                    rule.connectorFee = result.sourceAmount ? Math.round((result.sourceAmount - msg.amount) * 100) / 100 : 0
                    return rule
                  })
                  .catch(e => {
                    rule.connectorFee = 0
                    return rule
                  })
              })
          })
      })
  }
}
