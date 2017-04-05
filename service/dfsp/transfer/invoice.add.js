var joi = require('joi')
module.exports = {
  _rest: { // remove underscore to enable rest route
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
          identifier: joi.string().description('identifier').example('78956562'),
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
                identifier: joi.string().description('identifier'),
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
  'invoice.add': function (msg, $meta) {
    return this.config.exec.call(this, msg, $meta)
      .then((result) => {
        // {
        // account:"http://localhost:8014/ledger/accounts/kkk"
        // amount:"32"
        // currencyCode:"USD"
        // currencySymbol:"$"
        // invoiceId:34
        // invoiceInfo:"Invoice from kkk for 32 USD"
        // name:"kkk"
        // status:"pending"
        // identifier:"80989354"
        // }
        var params = {
          memo: 'Invoice from ' + result.name + ' for ' + result.amount + ' ' + result.currencyCode,
          submissionUrl: msg.spspServer + '/invoices',
          senderIdentifier: result.identifier
        }
        if (this.bus.config.spsp && this.bus.config.spsp.url && this.bus.config.spsp.url.startsWith('http://localhost')) {
          $meta.method = 'transfer.invoiceNotification.add'
          params.invoiceUrl = 'http://localhost:8010/receivers/invoices/' + result.invoiceId
        } else {
          $meta.method = 'spsp.transfer.invoiceNotification.add'
          params.invoiceId = '' + result.invoiceId
        }
        return this.bus.importMethod($meta.method)(params, $meta)
          .then((spspResponse) => {
            return result
          })
      })
  }
}
