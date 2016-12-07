var samples = require('./samples.json')
module.exports = {
  rest: {
    rpc: 'utils.samples.add',
    path: '/samples',
    config: {
      description: 'TODO: description',
      notes: 'TODO: note',
      tags: ['api', 'wallet']
    },
    method: 'post'
  },
  'samples.add': function (msg, $meta) {
    var getSamples = this.bus.importMethod('utils.samples.get')
    return getSamples({})
      .catch(() => {
        return Promise.all(
          (samples[this.bus.config.cluster] || samples['dev']).map((data) => this.bus.importMethod('wallet.add')(data))
        )
        .then(getSamples)
      })
  }
}
