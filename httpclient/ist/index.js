module.exports = {
  id: 'ist',
  createPort: require('ut-port-http'),
  url: 'http://ec2-35-163-231-111.us-west-2.compute.amazonaws.com:8088/directory/v1/user',
  namespace: ['ist/directory'],
  raw: {
    json: true,
    jar: true,
    strictSSL: false
  },
  parseResponse: false,
  requestTimeout: 300000,
  method: 'post',
  'directory.user.add.request.send': function (msg) {
    return {
      uri: '/add',
      payload: msg
    }
  }
}
