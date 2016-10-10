module.exports = {
  validationFailHandler: function (request, reply, source, error) {
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
  },
  rest: function (request, reply, method, customReply) {
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
}
