function validationFailHandler (request, reply, source, error) {
  var response = {}
  if (source === 'params') {
    response.id = 'InvalidUriParameterError'
    response.message = 'id is not a valid Uuid'
  } else {
    response.id = 'InvalidBodyError'
    response.message = 'Body did not match schema'
  }

  response.validationErrors = []
  error.data.details.forEach((err) => {
    response.validationErrors.push({
      message: err.message,
      params: err.context
    })
  })
  return reply(response)
}

function rest (request, reply, method, customReply) {
  // httpserver port should be bound (as this) in order for this method to work
  // Used in case header is "Content-Type: text/plain"
  if (typeof request.payload === 'string') {
    request.payload = Object.assign({
      plainText: request.payload
    }, request.params)
  } else if (request.payload === null) {
    request.payload = Object.assign({}, request.params)
  } else {
    request.payload = Object.assign({}, request.payload, request.params)
  }
  request.params.method = method
  return this.handler(request, reply, customReply)
}

function defaultReply (reply, response, $meta) {
  if (!response.error) {
    return reply(response, {
      'content-type': 'application/json'
    }, 200)
  }
  return reply({
    id: response.error.type,
    message: response.error.message
  }, {
    'content-type': 'application/json'
  }, (response.debug && response.debug.statusCode) || 400)
}

module.exports = function (methodsArray) {
  var methods = {
    rest: [],
    hooks: {}
  }
  methodsArray.forEach(function (method) {
    if (method.rest) {
      if (!method.rest.reply) {
        method.rest.reply = defaultReply
      }
      if (method.config && method.config.validate && !method.config.validate.failAction) {
        method.config.validate.failAction = validationFailHandler
      }
      methods.rest.push(method.rest)
    }
    method.hooks && Object.assign(methods.hooks, method.hooks)
  })
  return Object.assign({
    start: function () {
      if (!this.registerRequestHandler) {
        return
      }
      methods.rest.length && this.registerRequestHandler(
        methods.rest.map((route) => {
          return {
            method: route.method,
            path: route.path,
            handler: (request, reply) => rest.call(this, request, reply, route.rpc, route.reply),
            config: Object.assign({
              auth: false
            }, route.config)
          }
        })
      )
    }
  }, methods.hooks)
}
