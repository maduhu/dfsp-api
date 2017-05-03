var runTasks = require('./tasks')
module.exports = require('ut-run')
.run({}, module)
.then(runTasks)
// .then((app) => {
//     var id = 1
//     setInterval(() => {
//         app.bus.importMethod('forensic.log')({id: id++})
//     }, 1000)
// })
