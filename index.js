var runTasks = require('./tasks')
module.exports = require('ut-run')
.run({}, module)
.then(runTasks)
.then((app) => {
  app.bus.importMethod('forensic.log')({
    message: 'DFSP up and running',
    config: app.config
  })
  .catch((e) => {
    return app
  })
})
