var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'transfer.invoice.add',
    path: '/merchantInvoice',
    config: {
      description: 'Add an invoice',
      notes: 'Add an invoice',
      tags: ['api'],
      validate: {
        payload: joi.object({
          account: joi.string().description('account').example('http://ec2-35-163-249-3.us-west-2.compute.amazonaws.com:8014/ledger/accounts/merchant'),
          name: joi.string().description('name').example('merchant'),
          currencyCode: joi.string().description('currencyCode').example('USD'),
          currencySymbol: joi.string().description('currencySymbol').example('$'),
          amount: joi.number().description('amount').example(123),
          userNumber: joi.string().description('userNumber').example('78956562'),
          spspServer: joi.string().description('spspServer').example('http://ec2-35-163-249-3.us-west-2.compute.amazonaws.com:3043/v1')
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
  }
}
