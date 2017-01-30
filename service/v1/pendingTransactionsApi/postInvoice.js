var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'pendingTransactionsApi.invoice.add',
    path: '/v1/invoices',
    config: {
      description: 'Add an invoice',
      notes: 'Add an invoice',
      tags: ['api', 'pendingTransactions', 'v1'],
      validate: {
        payload: joi.object({
          accountNumber: joi.string().description('accountNumber').example('merchant').required(),
          amount: joi.number().description('amount').example(123).required(),
          userNumber: joi.string().description('userNumber').example('78956562').required()
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
  'invoice.add': function (msg, $meta) {
    $meta.method = 'ledger.account.get'
    return this.bus.importMethod($meta.method)({
      accountNumber: msg.accountNumber
    }, $meta)
      .then((ledgerResponse) => {
        $meta.method = 'ist.directory.user.get'
        return this.bus.importMethod($meta.method)({
          identifier: msg.userNumber
        }, $meta)
          .then((centralDirectoryResponse) => {
            $meta.method = 'account.account.get'
            return this.bus.importMethod($meta.method)({
              accountNumber: msg.accountNumber
            }, $meta)
            .then((res) => {
              $meta.method = 'directory.user.get'
              return this.bus.importMethod($meta.method)({
                actorId: res.actorId
              })
            }, $meta)
            .then((directoryResponse) => {
              $meta.method = 'transfer.invoice.add'
              return this.bus.importMethod($meta.method)({
                account: ledgerResponse.id,
                name: directoryResponse.name,
                currencyCode: ledgerResponse.currencyCode,
                currencySymbol: ledgerResponse.currencySymbol,
                amount: msg.amount,
                userNumber: msg.userNumber,
                spspServer: centralDirectoryResponse.spspReceiver,
                invoiceInfo: 'Invoice from ' + directoryResponse.name + ' for ' + msg.amount + ' ' + ledgerResponse.currencyCode
              }, $meta)
            })
          })
      })
  }
}
