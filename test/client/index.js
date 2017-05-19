module.exports = {
  ports: [{
    id: 'jsonrpc',
    createPort: require('ut-port-jsonrpc'),
    modules: {}
  }]
}
// module.exports = {
//   ports: [{
//     id: 'jsonrpc',
//     headers: {
//       Authorization: 'Basic ' + new Buffer('test' + ':' + '123').toString('base64')
//     },
//     createPort: require('ut-port-jsonrpc')
//   }],
//   modules: {}
// }
