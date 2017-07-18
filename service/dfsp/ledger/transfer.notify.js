var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'ledger.transfer.notify',
    path: '/receivers/{payee}/payments/{paymentId}',
    config: {
      description: 'Submit payment notification',
      notes: 'Submit payment notification',
      tags: ['api'],
      validate: {
        params: joi.object({
          payee: joi.string().description('Payee').example('alice'),
          paymentId: joi.string().description('paymentId').example('26711806-64a1-4196-85dd-37c64b61bb80')
        }),
        payload: joi.object({
          paymentId: joi.string().description('transfer id').example('6421cc77-fc43-4726-af3d-baaf5b18de9d'),
          destinationAmount: joi.string().description('destination amount').example('10.50'),
          status: joi.string().description('status').example('executed')
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Payment notification submited',
              schema: joi.string()
            }
          }
        }
      }
    },
    method: 'put'
  },
  'transfer.notify': function (msg, $meta) {
    return this.bus.importMethod('ledger.quote.get')({
      paymentId: msg.paymentId,
      isDebit: false
    })
    .then((res) => {
      return this.bus.importMethod('notification.notification.add')({
        channel: 'sms',
        operation: res.transferType,
        target: 'destination',
        identifier: res.identifier,
        params: {
          amount: res.amount,
          currency: res.currencyId
        }
      })
      .then(() => {
        return {}
      })
    })
  }
}
