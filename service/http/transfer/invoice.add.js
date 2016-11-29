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
          account: joi.string().description('account').example('l1p'),
          name: joi.string().description('name').example('l1p'),
          currencyCode: joi.string().description('currencyCode').example('USD'),
          currencySymbol: joi.string().description('currencySymbol').example('$'),
          amount: joi.number().description('amount').example(222),
          userNumber: joi.string().description('userNumber').example('l1p'),
          submissionUrl: joi.string().description('http://localhost:8010')
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
  'invoice.add.request.send': function (msg, $meta) {
    msg.invoiceInfo = 'Invoice from ' + msg.name + ' for ' + msg.amount + ' ' + msg.currencyCode
    return this.config.send(msg, $meta)
  },
  'invoice.add.response.receive': function (msg, $meta) {
    return this.config.receive(msg, $meta)
  }
}
