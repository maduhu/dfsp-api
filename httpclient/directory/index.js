module.exports = {
  id: 'directory',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8011',
  namespace: ['directory'],
  imports: ['directory'],
  method: 'post',
  'directory.user.add.request.send': function (msg, $meta) {
    return this.bus.importMethod('ist/directory.user.add')({
      url: 'http://localhost:8010'
    })
    .then((res) => {
      return this.config.send({
        userNumber: res.number,
        name: msg.name
      }, $meta)
    })
  }
}
