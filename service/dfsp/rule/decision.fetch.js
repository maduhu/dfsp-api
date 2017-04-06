module.exports = {
  'decision.fetch': function (msg, $meta) {
    return this.bus.importMethod('ledger.transferType.fetch')({})
      .then((transferTypes) => {
        msg.operationId = transferTypes.find((el) => el.transferCode === msg.transferType).transferTypeId
        // fetch channelRoleId
        return this.config.exec.call(this, msg, $meta)
          .then((condition) => {
            return this.bus.importMethod('ledger.transfer.fetch')({
              transferType: msg.transferType,
              accountNumber: msg.sourceAccount,
              currency: msg.currency
            })
              .then((transfers) => {
                // decisions, decisions...
                return this.bus.importMethod('spsp.rule.decision.fetch')(msg)
                  .then(result => {
                    if (result.sourceAmount) {
                      condition.connectorFee = Math.round((result.sourceAmount - msg.amount) * 100) / 100
                    } else {
                      condition.connectorFee = 0
                    }
                    return condition
                  })
                  .catch(e => {
                    condition.connectorFee = 0
                    return condition
                  })
              })
          })
      })
  }
}
