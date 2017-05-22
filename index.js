var runTasks = require('./tasks')
module.exports = require('ut-run')
.run({}, module)
.then(runTasks)
.then((app) => {
  app.bus.importMethod('forensic.log')({
    message: 'DFSP up and running',
    config: app.config
  })
  .catch(() => {
    return app
  })
})

// require('@leveloneproject/dfsp-directory/index_test')
// .then(() => {
//     debugger;
// }).catch(() => {
//     debugger;
// })
