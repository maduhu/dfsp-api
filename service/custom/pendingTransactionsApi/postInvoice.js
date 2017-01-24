var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'invoice.add',
    path: '/invoice',
    config: {
      description: 'Add an invoice',
      notes: 'Add an invoice',
      tags: ['api'],
      validate: {
        payload: joi.object({
          account: joi.string().description('account').example('http://ec2-35-163-249-3.us-west-2.compute.amazonaws.com:8014/ledger/accounts/merchant'),
          amount: joi.number().description('amount').example(123),
          userNumber: joi.string().description('userNumber').example('78956562')
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice Added',
              schema: joi.object().keys({
                invoiceNotificationId: joi.number().description('invoiceNotificationId'),
                invoiceUrl: joi.string().description('invoiceUrl'),
                userNumber: joi.string().description('userNumber'),
                status: joi.string().description('status'),
                memo: joi.string().description('memo')
              })
            }
          }
        }
      }
    },
    method: 'post'
  },
  'add': function (msg, $meta) {
    return this.bus.importMethod('spsp.transfer.payee.get')({
      identifier: msg.userNumber
    }, $meta)
       .then((res) => {
         return this.bus.importMethod('transfer.invoice.add')({
           account: msg.account,
           name: res.name,
           currencyCode: res.currencyCode,
           currencySymbol: res.currencySymbol,
           amount: msg.amount,
           userNumber: msg.userNumber,
           spspServer: res.spspServer,
           invoiceInfo: 'Invoice from ' + res.name + ' for ' + msg.amount + ' ' + res.currencyCode
         })
       })
  }
}
