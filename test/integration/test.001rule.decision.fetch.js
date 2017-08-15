/* eslint no-console: 0 */
var test = require('ut-run/test')
var commonFunc = require('./../lib/commonFunctions.js')
var joi = require('joi')
var config = require('./../lib/appConfig')
var uuid = require('uuid/v4')

var sender = {
  identifier: commonFunc.generateRandomNumber(),
  firstName: 'sender' + commonFunc.generateRandomNumber(),
  lastName: 'sender' + commonFunc.generateRandomNumber(),
  dob: '10/12/1999',
  nationalId: '' + commonFunc.generateRandomNumber(),
  phoneNumber: '' + commonFunc.generateRandomNumber(),
  accountName: 'acc_' + commonFunc.generateRandomNumber(),
  password: '1234',
  roleName: 'customer'
}

var receiver = {
  identifier: commonFunc.generateRandomNumber(),
  firstName: 'receiver' + commonFunc.generateRandomNumber(),
  lastName: 'receiver' + commonFunc.generateRandomNumber(),
  dob: '10/12/1999',
  nationalId: '' + commonFunc.generateRandomNumber(),
  phoneNumber: '' + commonFunc.generateRandomNumber(),
  accountName: 'acc_' + commonFunc.generateRandomNumber(),
  password: '1234',
  roleName: 'customer'
}

var connector = {
  identifier: commonFunc.generateRandomNumber(),
  firstName: 'connector' + commonFunc.generateRandomNumber(),
  lastName: 'connector' + commonFunc.generateRandomNumber(),
  dob: '10/12/1999',
  nationalId: '' + commonFunc.generateRandomNumber(),
  phoneNumber: '' + commonFunc.generateRandomNumber(),
  accountName: 'acc_' + commonFunc.generateRandomNumber(),
  password: '1234',
  accountTypeId: 6
}

test({
  type: 'integration',
  name: 'DFSP Rule service',
  server: config.server,
  serverConfig: config.serverConfig,
  client: config.client,
  clientConfig: config.clientConfig,
  peerImplementations: config.peerImplementations,
  steps: function (test, bus, run) {
    return run(test, bus, [
      {
        name: 'Add sender',
        method: 'wallet.add',
        params: (context) => {
          return sender
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            account: 'http://localhost:8014/ledger/accounts/' + sender.accountName,
            accountName: joi.string().valid(sender.accountName),
            accountNumber: joi.string().valid(sender.accountName),
            actorId: joi.string().required(),
            currency: joi.string().required(),
            dob: joi.string().valid('10/12/1999'),
            firstName: joi.string().valid(sender.firstName),
            identifier: joi.string().required(),
            lastName: joi.string().valid(sender.lastName),
            nationalId: joi.string().valid(sender.nationalId),
            password: joi.string().valid('1234'),
            phoneNumber: joi.string().valid(sender.phoneNumber),
            roleName: joi.string().valid('customer')
          })).error, null)
        }
      },
      {
        name: 'Add receiver',
        method: 'wallet.add',
        params: (context) => {
          return receiver
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            account: 'http://localhost:8014/ledger/accounts/' + receiver.accountName,
            accountName: joi.string().valid(receiver.accountName),
            accountNumber: joi.string().valid(receiver.accountName),
            actorId: joi.string().required(),
            currency: joi.string().required(),
            dob: joi.string().valid('10/12/1999'),
            firstName: joi.string().valid(receiver.firstName),
            identifier: joi.string().required(),
            lastName: joi.string().valid(receiver.lastName),
            nationalId: joi.string().valid(receiver.nationalId),
            password: joi.string().valid('1234'),
            phoneNumber: joi.string().valid(receiver.phoneNumber),
            roleName: joi.string().valid('customer')
          })).error, null)
        }
      },
      {
        name: 'Add connector',
        method: 'wallet.add',
        params: (context) => {
          return connector
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            account: 'http://localhost:8014/ledger/accounts/' + connector.accountName,
            accountName: joi.string().valid(connector.accountName),
            accountNumber: joi.string().valid(connector.accountName),
            actorId: joi.string().required(),
            currency: joi.string().required(),
            dob: joi.string().valid('10/12/1999'),
            firstName: joi.string().valid(connector.firstName),
            identifier: joi.string().required(),
            lastName: joi.string().valid(connector.lastName),
            nationalId: joi.string().valid(connector.nationalId),
            password: joi.string().valid('1234'),
            phoneNumber: joi.string().valid(connector.phoneNumber),
            accountTypeId: joi.number().valid(6)
          })).error, null)
        }
      },
      {
        name: 'Rule decision fetch - Receive',
        method: 'rule.decision.fetch',
        params: () => {
          return {
            paymentId: uuid(),
            sourceIdentifier: '17902519',
            sourceIdentifierType: 'eur',
            destinationAccount: 'http://localhost:8014/ledger/accounts/bob',
            spspServer: 'http://localhost:8010',
            destinationIdentifier: '111111111',
            destinationIdentifierType: 'eur',
            transferType: 'p2p',
            amountType: 'RECEIVE',
            amount: '1001',
            currency: 'TZS'
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            amount: joi.string().valid('1001.00').required(),
            commission: joi.string().required(),
            connectorAccount: joi.string().required(),
            currencyId: joi.string().required(),
            destinationAccount: joi.string().required(),
            expiresAt: joi.string().required(),
            fee: joi.string().required(),
            identifier: joi.string().required(),
            identifierType: joi.string().required(),
            ipr: joi.string().required(),
            isDebit: joi.boolean().required(),
            params: joi.object().required(),
            paymentId: joi.string().required(),
            quoteId: joi.string().required(),
            receiver: joi.string().required(),
            sourceExpiryDuration: joi.number().required(),
            transferTypeId: joi.number().required()
          })).error, null)
        }
      },
      {
        name: 'Rule decision fetch - Send',
        method: 'rule.decision.fetch',
        params: () => {
          return {
            paymentId: uuid(),
            sourceIdentifier: '17902519',
            sourceIdentifierType: 'eur',
            destinationAccount: 'http://localhost:8014/ledger/accounts/bob',
            spspServer: 'http://localhost:8010',
            destinationIdentifier: '111111111',
            destinationIdentifierType: 'eur',
            transferType: 'p2p',
            amountType: 'SEND',
            amount: '1001',
            currency: 'TZS'
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            amount: joi.string().valid('1001.00').required(),
            commission: joi.string().required(),
            connectorAccount: joi.string().required(),
            currencyId: joi.string().required(),
            destinationAccount: joi.string().required(),
            expiresAt: joi.string().required(),
            fee: joi.string().required(),
            identifier: joi.string().required(),
            identifierType: joi.string().required(),
            ipr: joi.string().allow(null),
            isDebit: joi.boolean().required(),
            params: joi.object().required(),
            paymentId: joi.string().required(),
            quoteId: joi.string().required(),
            receiver: joi.string().allow(null),
            sourceExpiryDuration: joi.number().allow(null),
            transferTypeId: joi.number().required()
          })).error, null)
        }
      }])
  }
}, module.parent)
