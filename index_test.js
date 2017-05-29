/* eslint no-process-exit: 0 */
module.exports = require('ut-run').run({
  app: 'server',
  method: 'debug',
  env: 'test'
}, module)
