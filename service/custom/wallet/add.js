var joi = require('joi')
module.exports = {
  rest: { // remove underscore to enable rest route
    rpc: 'wallet.add',
    path: '/wallet',
    config: {
      description: 'Add wallet',
      notes: 'Add wallet',
      tags: ['api'],
      validate: {
        payload: joi.object({
          identifier: joi.string().description('identifier').example('123456789'),
          firstName: joi.string().description('firstName').example('Test'),
          lastName: joi.string().description('lastName').example('Testov'),
          dob: joi.string().description('dob').example('10/12/1999'),
          nationalId: joi.string().description('nationalId').example('123654789'),
          phoneNumber: joi.string().description('phoneNumber').example('0122523365225'),
          accountName: joi.string().description('accountName').example('000000044'),
          password: joi.string().description('password').example('123'),
          roles: joi.array().description('roles').example(['customer'])
        })
      },
      plugins: {
        'hapi-swagger': {
          responses: {
            '200': {
              description: 'Wallet added',
              schema: joi.object()
            }
          }
        }
      }
    },
    method: 'post'
  },
  add: function (msg, $meta) {
    /* e.g.
      {
        "identifier": "123456789",
        "firstName": "Test",
        "lastName": "Testov",
        "dob": "10/12/1999",
        "nationalId": "123654789",
        "phoneNumber": "0122523365225",
        "accountName": "000000044",
        "password": 123
      }
    */
    var reversals = []
    var result = Object.assign({}, msg)
    return new Promise((resolve, reject) => {
      if (msg.identifier) {
        return this.bus.importMethod('ist.directory.user.get')({
          identifier: msg.identifier
        })
        .then((res) => {
          return resolve({
            identifier: msg.identifier
          })
        })
        .catch((err) => {
          return reject(err)
        })
      } else {
        resolve({})
      }
    })
    .then((res) => {
      msg.identifier = res.identifier
      return this.bus.importMethod('directory.user.add')(msg)
      .then((res) => {
        result.actorId = '' + res.actorId
        reversals.push({
          method: 'directory.user.remove',
          msg: {
            actorId: result.actorId
          }
        })
        return res
      })
    })
    .then((res) => {
      result.identifier = res.identifier
      if (msg.phoneNumber) { // add subscription for the phone number
        return this.bus.importMethod('subscription.subscription.add')({
          actorId: result.actorId,
          phoneNumber: msg.phoneNumber
        })
        .then((res) => {
          reversals.push({
            method: 'subscription.subscription.remove',
            msg: {
              subscriptionId: res.subscriptionId
            }
          })
          return res
        })
      } else {
        return res
      }
    })
    .then((res) => { // create the account in the ledger
      if (msg.accountName) {
        return this.bus.importMethod('ledger.account.add')({
          balance: msg.balance || 1000,
          name: msg.accountName
        })
        .then((res) => {
          // {
          //   id: 'http://localhost:8014/ledger/accounts/zzz',
          //   name: 'zzz',
          //   balance: '1000.00',
          //   currency: 'TZS',
          //   is_disabled: false
          // }
          result.account = res.id
          result.currency = res.currency
          result.accountNumber = res.accountNumber
          reversals.push({
            method: 'ledger.account.remove',
            msg: {
              accountNumber: res.accountNumber
            }
          })
          return res
        })
      } else {
        return res
      }
    })
    .then((res) => { // create the account in the account service
      if (result.accountNumber) {
        return this.bus.importMethod('account.account.add')({
          actorId: result.actorId,
          accountNumber: result.accountNumber,
          isDefault: true,
          isSignatory: true
        })
        .then((r) => {
          reversals.push({
            method: 'account.account.remove',
            msg: {
              accountNumber: result.accountNumber
            }
          })
          return r
        })
      } else {
        return res
      }
    })
    .then((res) => { // add the user and pin, note that in future the user identifier may not be the phone
      if (msg.password) {
        return this.bus.importMethod('identity.add')({
          hash: {
            actorId: result.actorId,
            identifier: msg.phoneNumber,
            type: 'password',
            password: msg.password
          },
          roles: msg.roles
        })
      } else {
        return res
      }
    })
    .then((res) => { // add the phone as identification
      return this.bus.importMethod('identity.add')({
        hash: {
          actorId: result.actorId,
          identifier: msg.phoneNumber,
          type: 'ussd'
        }
      })
    })
    .then((res) => (result))
    .catch((err) => {
      if (reversals.length) {
        return Promise.all(reversals.map((reversal) => {
          return this.bus.importMethod(reversal.method)(reversal.msg)
        }))
        .then(() => {
          throw err
        })
      }
      throw err
    })
  }
}
