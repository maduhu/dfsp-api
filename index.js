var runTasks = require('./tasks')
module.exports = require('ut-run').run({}, module).then(runTasks)
