var samples = require('./data.json')
module.exports = {
  rest: {
    rpc: 'samples.get',
    path: '/samples',
    config: {
      description: 'TODO: description',
      notes: 'TODO: note',
      tags: ['api', 'samples']
    },
    method: 'get'
  },
  'get': function (msg, $meta) {
    return Promise.all(
      (samples[this.bus.config.cluster] || samples['dfsp2']).map((sample) => {
        return this.bus.importMethod('payee.get')({
          payee: sample.userNumber
        }).then((res) => {
          return Object.assign(res, sample)
        })
      })
    )
  }
}
