var samples = require('./samples.json')
module.exports = {
  rest: {
    rpc: 'utils.samples.get',
    path: '/samples',
    config: {
      description: 'TODO: description',
      notes: 'TODO: note',
      tags: ['api', 'wallet']
    },
    method: 'get'
  },
  'samples.get': function (msg, $meta) {
    return Promise.all(
      (samples[this.bus.config.cluster] || samples['dev']).map((sample) => {
        return this.bus.importMethod('receivers.payee.get')({
          payee: sample.userNumber
        }).then((res) => {
          return Object.assign(res, sample)
        })
      })
    )
  }
}
