var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.payment.notify',
    path: '/receivers/{payee}/payments/{uuid}',
    config: {
      description: 'Submit payment notification',
      notes: 'Submit payment notification',
      tags: ['api'],
      validate: {
        params: joi.object({
          payee: joi.string().description('Payee').example('alice'),
          uuid: joi.string().description('uuid').example('26711806-64a1-4196-85dd-37c64b61bb80')
        }),
        payload: joi.object({
          senderIdentifier: joi.string().description('sender identifier').example('1234567890'),
          transferId: joi.string().description('transfer id').example('6421cc77-fc43-4726-af3d-baaf5b18de9d'),
          destinationAmount: joi.string().description('destination amount').example('10.50'),
          memo: joi.string().description('memo').example('Will you be my friend?'),
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
  'payment.notify': function (msg, $meta) {
    return {}
  }
}
