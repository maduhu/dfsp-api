var runTasks = require('./tasks')
module.exports = require('ut-run')
.run({}, module)
.then(runTasks)
.then((app) => {
  return app.bus.importMethod('forensic.log')({
    message: 'DFSP Api up and running',
    config: app.config
  })
  .then(() => app)
  .catch(() => app)
})
