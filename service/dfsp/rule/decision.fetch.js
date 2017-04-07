var error = require('./errors')
module.exports = {
  'decision.fetch': function (msg, $meta) {
    return this.bus.importMethod('ledger.transferType.fetch')({})
      .then((transferTypes) => {
        msg.operationId = transferTypes.find((el) => el.transferCode === msg.transferType).transferTypeId
        return this.config.exec.call(this, msg, $meta)
          .then((rule) => {
            return this.bus.importMethod('ledger.transfer.fetch')({
              transferType: msg.transferType,
              accountNumber: msg.sourceAccount,
              currency: msg.currency
            })
              .then((transfers) => {
                // decisions, decisions...
                if (rule.limit.maxAmountDaily && transfers.amountDaily > rule.limit.maxAmountDaily) {
                  throw new error.maxAmountDaily({ limit: rule.limit.maxAmountDaily })
                }
                if (rule.limit.maxCountDaily && transfers.countDaily > rule.limit.maxCountDaily) {
                  throw new error.maxCountDaily({ limit: rule.limit.maxCountDaily })
                }
                if (rule.limit.maxAmountWeekly && transfers.amountWeekly > rule.limit.maxAmountWeekly) {
                  throw new error.maxAmountWeekly({ limit: rule.limit.maxAmountWeekly })
                }
                if (rule.limit.maxCountWeekly && transfers.countWeekly > rule.limit.maxCountWeekly) {
                  throw new error.maxCountWeekly({ limit: rule.limit.maxCountWeekly })
                }
                if (rule.limit.maxAmountMonthly && transfers.amountMonthly > rule.limit.maxAmountMonthly) {
                  throw new error.maxAmountMonthly({ limit: rule.limit.maxAmountMonthly })
                }
                if (rule.limit.maxCountMonthly && transfers.countMonthly > rule.limit.maxCountMonthly) {
                  throw new error.maxCountMonthly({ limit: rule.limit.maxCountMonthly })
                }
                return this.bus.importMethod('spsp.rule.decision.fetch')(msg)
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
