var joi = require('joi')
module.exports = {
  _rest: { // remove underscore to enable rest route
    rpc: 'transfer.invoice.cancel',
    path: '/cancelInvoice',
    config: {
      description: 'Cancel invoice',
      notes: 'Cancel invoice',
      tags: ['api'],
      validate: {
        payload: joi.object({
          invoiceId: joi.number().description('Invoice ID').example(1)
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice Cancelled',
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
  'invoice.cancel': function (msg, $meta) {
    // {
    //   invoiceId: 1,
    //   identifier: 'fdsaasfd'
    // }
    return this.config.exec.call(this, msg, $meta)
      .then(() => {
        return this.bus.importMethod('ist.directory.user.get')({
          identifier: msg.identifier
        })
      })
      .then((result) => {
        // result.spspReceiver
        if (this.bus.config.spsp && this.bus.config.spsp.url && this.bus.config.spsp.url.startsWith('http://localhost')) {
          return this.bus.importMethod('transfer.invoiceNotification.cancel')({
            invoiceUrl: 'http://localhost:8010/receivers/invoices/' + msg.invoiceId
          })
        } else {
          return this.bus.importMethod('spsp.transfer.invoiceNotification.cancel')({
            invoiceId: '' + msg.invoiceId,
            submissionUrl: result.spspReceiver + '/invoices'
          })
        }
      })
  }
}
