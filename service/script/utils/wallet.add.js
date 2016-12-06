var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'utils.wallet.add',
    path: '/utils/wallet',
    config: {
      description: 'TODO: description',
      notes: 'TODO: note',
      tags: ['api', 'wallet'],
      validate: {
        payload: joi.object().keys({
          wallets: joi.array().items(
            joi.object().keys({
              identifier: joi.string().description('Unique number taken from registration into Central Directory Service'),
              pin: joi.string().description('The pin that will be used for authorization inside USSD'),
              accountName: joi.string().description('Used inside multiple service. This is legder.accountNumber/direcory.userNumber')
            })
          ).example([{
            identifier: '50900173',
            pin: '1234',
            accountName: 'test5'
          }, {
            identifier: '45564468',
            pin: '1234',
            accountName: 'test6'
          }])
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'TODO: response description',
              schema: joi.object()
            }
          }
        }
      }
    },
    method: 'post'
  },
  'wallet.add': function (msg, $meta) {
    if (!msg.wallets.length) {
      throw Error('Invalid body')
    }
    return Promise.all(
      msg.wallets.map((wallet) => {
        return this.bus.importMethod('wallet.add')({
          userNumber: wallet.identifier,
          name: wallet.accountName,
          accountNumber: wallet.accountName,
          phoneNumber: wallet.accountName,
          password: wallet.pin
        })
      })
    )
    .then((result) => {
      return result
    })
  }
}
