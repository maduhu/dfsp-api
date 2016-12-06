module.exports = {
  id: 'script',
  createPort: require('ut-port-script'),
  imports: ['wallet', 'receivers', 'utils'],
  logLevel: 'trace'
}
