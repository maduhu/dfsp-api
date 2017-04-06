var joi = require('joi')
module.exports = {
  rest: {
    rpc: 'productInvoiceApi.productInvoice.pay',
    path: '/v1/payments',
    config: {
      description: 'Add a pending payment',
      notes: 'Add a pending payment',
      tags: ['api', 'pendingPaymentss', 'v1', 'payments', 'postPayment'],
      validate: {
        payload: joi.object({
          account: joi.string().description('Merchant account').example('merchant').required(),
          amount: joi.number().description('Amount').example(123).required(),
          info: joi.string().description('Invoice description').example('Invoice from merchant to Bob').required()
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Pending payment created',
              schema: joi.object().keys({
                paymentId: joi.number().description('Invoice Id'),
                account: joi.string().description('Merchant account'),
                currencyCode: joi.string().description('currency code'),
                currencySymbol: joi.string().description('currency symbol'),
                amount: joi.string().description('amount'),
                status: joi.string().description('status'),
                info: joi.string().description('info')
              })
            }
          }
        }
      }
    },
    method: 'post'
  },
  'payment.add': function (msg, $meta) {
    $meta.method = 'ledger.account.get'
    return this.bus.importMethod($meta.method)({
      accountNumber: msg.account
    }, $meta)
      .then((ledgerResponse) => {
        $meta.method = 'ist.directory.user.get'
        return this.bus.importMethod($meta.method)({
          identifier: msg.identifier
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
                var info = (typeof msg.info !== 'undefined') ? msg.info : 'Invoice from ' + directoryResponse.firstName + ' ' + directoryResponse.lastName + ' for ' + msg.amount + ' ' + ledgerResponse.currencyCode
                $meta.method = 'transfer.invoice.add'
                return this.bus.importMethod($meta.method)({
                  account: ledgerResponse.id,
                  name: directoryResponse.firstName + ' ' + directoryResponse.lastName,
                  currencyCode: ledgerResponse.currencyCode,
                  currencySymbol: ledgerResponse.currencySymbol,
                  amount: msg.amount,
                  identifier: msg.identifier,
                  spspServer: centralDirectoryResponse.spspReceiver,
                  invoiceInfo: info
                }, $meta)
                  .then((invoiceResponse) => {
                    return {
                      invoiceId: invoiceResponse.invoiceId,
                      account: msg.account,
                      firstName: directoryResponse.firstName,
                      lastName: directoryResponse.lastName,
                      currencyCode: ledgerResponse.currencyCode,
                      currencySymbol: ledgerResponse.currencySymbol,
                      amount: msg.amount,
                      status: invoiceResponse.status,
                      identifier: msg.identifier,
                      info: info
                    }
                  })
              })
          })
      })
  }
}
