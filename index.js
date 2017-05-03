var runTasks = require('./tasks')
module.exports = require('ut-run')
.run({}, module)
.then(runTasks)
.then((app) => {
    setInterval(() => {
        app.bus.importMethod('forensic.log')({x: 1})
    }, 1000)
})
