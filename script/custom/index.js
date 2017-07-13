module.exports = {
  id: 'custom',
  createPort: require('ut-port-script'),
  imports: [
    'wallet',
    'payee',
    'samples'
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
