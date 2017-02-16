var cache = {}
module.exports = {
  set: function (key, value) {
    return (cache[key] = value)
  },
  get: function (key) {
    return cache[key]
  },
  bind: function (key) {
    return function (msg, $meta) {
      return cache[key] || this.config.exec(msg, $meta).then((value) => (cache[key] = value))
    }
  }
}
