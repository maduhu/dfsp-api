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
      .then((resPayee) => {
        return this.bus.importMethod('dfsp/transfer.invoice.add')({
          account: msg.account,
          name: resPayee.name,
          currencyCode: resPayee.currencyCode,
          currencySymbol: resPayee.currencySymbol,
          amount: msg.amount,
          userNumber: msg.userNumber,
          spspServer: resPayee.spspServer,
          invoiceInfo: 'Invoice from ' + resPayee.name + ' for ' + msg.amount + ' ' + resPayee.currencyCode
        })
          .then((transferResult) => {
            var invoiceParams = {
              memo: 'Invoice from ' + resPayee.name + ' for ' + msg.amount + ' ' + resPayee.currencyCode,
              submissionUrl: resPayee.spspServer + '/invoices',
              senderIdentifier: transferResult.userNumber,
              invoiceId: '' + transferResult.invoiceId
            }
            $meta.method = 'spsp.transfer.invoiceNotification.add'
            //  "type": "payee",
            //   "name": "bob",
            //   "account": "levelone.dfsp1.bob",
            //   "currencyCode": "USD",
            //   "currencySymbol": "$",
            //   "imageUrl": "https://red.ilpdemo.org/api/receivers/bob/profile_pic.jpg",
            //   "spspServer": "http://ec2-35-163-231-111.us-west-2.compute.amazonaws.com:3043/v1"
            // return this.bus.importMethod($meta.method)(invoiceParams, $meta)
            return this.bus.importMethod('spsp.transfer.invoiceNotification.add')(invoiceParams, $meta)
              .then((spspResult) => {
                return {
                  result: spspResult
                }
              }).catch((e) => {
                // check error
              })
          })
      })
  }
}
