module.exports = {
  'user.add': function (msg, $meta) {
    if (!msg.userNumber) {
      return this.bus.importMethod('ist.directory.user.add')({

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
