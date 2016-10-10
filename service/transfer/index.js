var util = require('../util')
module.exports = {
  start: function () {
    if (!this.registerRequestHandler) {
      return
    }
    var routes = [

    ].map((route) => {
      return {
        method: route.method,
        path: route.path,
        handler: (request, reply) => util.rest.call(this, request, reply, route.rpc, route.reply),
        config: Object.assign({
          auth: false
        }, route.config)
      }
    })
    this.registerRequestHandler(routes)
  }
}
