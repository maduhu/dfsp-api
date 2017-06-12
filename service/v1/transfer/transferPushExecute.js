var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.push.execute',
    path: '/v1/transfer/pushExecute',
    config: {
      description: 'Send money',
      notes: 'Send money',
      tags: ['api', 'v1', 'transfer', 'pushExecute'],
      validate: {
        payload: joi.object({
          sourceIdentifier: joi.string().description('Sendet identifier').example('Sender identifier??????').required(),
          sourceAccount: joi.string().description('Source amount').example('Source amount??????????????????').required(),
          receiver: joi.string().description('Receiver').example('Receiver ???????????????').required(),
          destinationAmount: joi.string().description('Destination amount').example('Destination amount???????????????????').required(),
          currency: joi.string().description('Currency').example('USD').required(),
          fee: joi.string().description('Fee').example('1').required(),
          memo: joi.string().description('Memo').example('Memo').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice payment executed',
              schema: joi.object().keys({
                invoiceId: joi.string().description('Invoice Id').example('6'),
                status: joi.string().description('The new invoice status').example('paid')
              }).unknown()
            }
          }
        }
      }
    },
    method: 'post'
  },
  'send': function (msg, $meta) {
    return this.bus.importMethod('transfer.push.execute')({
      sourceIdentifier: msg.identifier,
      sourceAccount: msg.sourceAccount,
      receiver: msg.receiver,
      destinationAmount: msg.destinationAmount,
      currency: msg.destinationCurrency,
      fee: msg.fee,
      memo: {
        fee: msg.fee,
        transferCode: 'p2p'
        // debitName: name,
        // creditName: destinationName
      }
    })
    .then((result) => {
      return result
    })
    .catch((error) => {
      return error
    })
  }
}
