module.exports = {
  id: 'v1',
  createPort: require('ut-port-script'),
  imports: [
    'pendingTransactionsApi',
    'invoiceApi'
  ],
  logLevel: 'trace',
  log: {
    transform: {
      payee: 'hide',
      name: 'hide',
      firstName: 'hide',
      lastName: 'hide',
      nationalId: 'hide',
      dob: 'hide'
    }
  }
}
