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
          roleName: joi.string().description('roleName').example('customer')
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
    var response = Object.assign({}, msg)
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
      if (this.bus.config.spsp && this.bus.config.spsp.url && this.bus.config.spsp.url.startsWith('http://localhost')) {
        msg.identifier = msg.firstName
      } else {
        msg.identifier = res.identifier
      }
      return this.bus.importMethod('directory.user.add')(msg)
      .then((res) => {
        response.actorId = '' + res.actorId
        reversals.push({
          method: 'directory.user.remove',
          msg: {
            actorId: response.actorId
          }
        })
        return res
      })
    })
    .then((res) => {
      response.identifier = res.identifier
      if (msg.phoneNumber) { // add subscription for the phone number
        return this.bus.importMethod('subscription.subscription.add')({
          actorId: response.actorId,
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
          response.account = res.id
          response.currency = res.currency
          response.accountNumber = res.accountNumber
          reversals.push({
            method: 'ledger.account.remove',
            msg: {
              accountNumber: res.accountNumber
            }
          })
          return res
        })
        .then((res) => {
          return this.bus.importMethod('account.actorAccount.add')({
            actorId: response.actorId,
            accountNumber: res.accountNumber,
            isDefault: true,
            isSignatory: true,
            roleName: msg.roleName
          })
          .then((res) => {
            reversals.push({
              method: 'account.actorAccount.remove',
              msg: {
                actorAccountId: res.actorAccountId
              }
            })
            return res
          })
        })
      }
      return res
    })
    .then((res) => { // create the account in the account service
      if (res.accountNumber && msg.roleName === 'agent') {
        return this.bus.importMethod('ledger.accountType.fetch')({})
          .then((accountTypes) => {
            return this.bus.importMethod('ledger.account.add')({
              balance: 0,
              name: 'commisison',
              accountNumber: response.actorId + '_' + res.accountNumber + '_commisison',
              accountTypeId: accountTypes.find((accountType) => (accountType.name === 'commission')).accountTypeId
            })
          })
          .then((res) => {
            reversals.push({
              method: 'ledger.account.remove',
              msg: {
                accountNumber: res.accountNumber
              }
            })
            return res
          })
          .then((res) => {
            return this.bus.importMethod('account.actorAccount.add')({
              actorId: response.actorId,
              accountNumber: res.accountNumber,
              isDefault: false,
              isSignatory: false
            })
            .then((res) => {
              reversals.push({
                method: 'account.actorAccount.remove',
                msg: {
                  actorAccountId: res.actorAccountId
                }
              })
              return res
            })
          })
      }
      return res
    })
    .then((res) => { // add the user and pin, note that in future the user identifier may not be the phone
      if (msg.password) {
        return this.bus.importMethod('identity.add')({
          hash: {
            actorId: response.actorId,
            identifier: msg.phoneNumber,
            type: 'password',
            password: msg.password
          }
        })
      } else {
        return res
      }
    })
    .then((res) => { // add the phone as identification
      return this.bus.importMethod('identity.add')({
        hash: {
          actorId: response.actorId,
          identifier: msg.phoneNumber,
          type: 'ussd'
        }
      })
    })
    .then((res) => (response))
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
