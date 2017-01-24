module.exports = {
  id: 'custom',
  createPort: require('ut-port-script'),
  imports: [
    'wallet',
    'payee',
    'samples',
    'pendingTransactionsApi'
  ],
  logLevel: 'trace'
}
