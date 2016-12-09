module.exports = {
  'user.add': function (msg, $meta) {
    if (!msg.userNumber) {
      return this.bus.importMethod('ist.directory.user.add')({
        url: 'http://localhost:8010'
      })
      .then((res) => {
        return this.config.exec({
          userNumber: res.number,
          name: msg.name
        }, $meta)
      })
    }
    return this.config.exec(msg, $meta)
  }
}
