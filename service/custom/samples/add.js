var samples = require('./data.json')
module.exports = {
  rest: {
    rpc: 'samples.add',
    path: '/samples',
    config: {
      description: 'TODO: description',
      notes: 'TODO: note',
      tags: ['api']
    },
    method: 'post'
  },
  'add': function (msg, $meta) {
    var getSamples = this.bus.importMethod('samples.get')
    return getSamples({})
      .catch(() => {
        return Promise.all(
          (samples[this.bus.config.cluster] || samples['dfsp2']).map((data) => this.bus.importMethod('wallet.add')(data))
        )
        .then(getSamples)
      })
  }
}
