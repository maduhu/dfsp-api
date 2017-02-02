var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoice.add',
    path: '/v1/invoices',
    config: {
      description: 'Add an invoice',
      notes: 'Add an invoice',
      tags: ['api', 'pendingTransactions', 'v1', 'invoices', 'postInvoice'],
      validate: {
        payload: joi.object({
          account: joi.string().description('Merchant account').example('merchant').required(),
          amount: joi.number().description('Amount').example(123).required(),
          userNumber: joi.string().description('Client userNumber').example('78956562').required(),
          info: joi.string().description('Invoice description').example('Invoice from merchant to Bob').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Invoice Added',
              schema: joi.object().keys({
                type: joi.string().description('type'),
                invoiceNotificationId: joi.number().description('invoiceNotificationId'),
                account: joi.string().description('account'),
                name: joi.string().description('merchant name'),
                currencyCode: joi.string().description('currency code'),
                currencySymbol: joi.string().description('currency symbol'),
                amount: joi.string().description('amount'),
                status: joi.string().description('status'),
                userNumber: joi.string().description('userNumber'),
                info: joi.string().description('info')
              })
            }
          }
        }
      }
    },
    method: 'post'
  },
  'invoice.add': function (msg, $meta) {
    $meta.method = 'ledger.account.get'
    return this.bus.importMethod($meta.method)({
      accountNumber: msg.account
    }, $meta)
      .then((ledgerResponse) => {
        $meta.method = 'ist.directory.user.get'
        return this.bus.importMethod($meta.method)({
          identifier: msg.userNumber
        }, $meta)
          .then((centralDirectoryResponse) => {
            $meta.method = 'account.account.get'
            return this.bus.importMethod($meta.method)({
              accountNumber: msg.account
            }, $meta)
              .then((res) => {
                $meta.method = 'directory.user.get'
                return this.bus.importMethod($meta.method)({
                  actorId: res.actorId
                })
              }, $meta)
              .then((directoryResponse) => {
                var info = (typeof msg.info !== 'undefined') ? msg.info : 'Invoice from ' + directoryResponse.name + ' for ' + msg.amount + ' ' + ledgerResponse.currencyCode
                $meta.method = 'transfer.invoice.add'
                return this.bus.importMethod($meta.method)({
                  account: ledgerResponse.id,
                  name: directoryResponse.name,
                  currencyCode: ledgerResponse.currencyCode,
                  currencySymbol: ledgerResponse.currencySymbol,
                  amount: msg.amount,
                  userNumber: msg.userNumber,
                  spspServer: centralDirectoryResponse.spspReceiver,
                  invoiceInfo: info
                }, $meta)
                  .then((invoiceResponse) => {
                    return {
                      type: invoiceResponse.type,
                      invoiceNotificationId: invoiceResponse.invoiceId,
                      account: msg.account,
                      name: directoryResponse.name,
                      currencyCode: ledgerResponse.currencyCode,
                      currencySymbol: ledgerResponse.currencySymbol,
                      amount: msg.amount,
                      status: invoiceResponse.status,
                      userNumber: msg.userNumber,
                      info: info
                    }
                  })
              })
          })
      })
  }
}
