module.exports = {
  id: 'directory',
  createPort: require('ut-port-jsonrpc'),
  url: 'http://localhost:8011',
  namespace: ['directory'],
  imports: ['directory'],
  method: 'post',
  'directory.user.add.request.send': function (msg, $meta) {
    if (!msg.userNumber) {
      return this.bus.importMethod('ist/directory.user.add')({
        url: 'http://localhost:8010'
      })
      .then((res) => {
        return this.config.send({
          userNumber: msg.userNumber,
          name: msg.name
        }, $meta)
      })
    }
    return this.config.send(msg, $meta)
  }
}
