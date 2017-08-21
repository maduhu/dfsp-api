/* eslint no-console: 0 */
var test = require('ut-run/test')
var config = require('./../lib/appConfig')
var joi = require('joi')

var commonFunc = require('./../lib/commonFunctions.js')
const MERCHANT = commonFunc.getMerchant('merchant_1113')
const CLIENT = commonFunc.getCustomer('client')
var userWithoutAccount = commonFunc.getCustomer('withoutAccount')

test({
  type: 'integration',
  name: 'Service dfsp',
  server: config.server,
  serverConfig: config.serverConfig,
  client: config.client,
  clientConfig: config.clientConfig,
  peerImplementations: config.peerImplementations,
  steps: function (test, bus, run) {
    return run(test, bus, [
      {
        name: 'Add invoice with missing invoiceType',
        method: 'transfer.invoice.add',
        params: () => {
          return {
            account: CLIENT.accountName,
            amount: '5002',
            merchantIdentifier: MERCHANT.phoneNumber,
            info: 'Test invoice API - pending invoice',
            name: MERCHANT.firstName,
            currencyCode: 'TZS',
            currencySymbol: 'TSh',
            identifier: CLIENT.phoneNumber,
            spspServer: 'http://localhost:8010'
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            account: joi.string().required(),
            amount: joi.string().required(),
            currencyCode: joi.string().required(),
            currencySymbol: joi.string().required(),
            invoiceId: joi.number().required(),
            invoiceInfo: joi.string().allow(null),
            invoiceType: joi.string(),
            merchantIdentifier: joi.string().required(),
            name: joi.string().required(),
            status: joi.string().required(),
            type: joi.string().required()
          })).error, null)
        }
      },
      {
        name: 'Add new client without wallet',
        method: 'wallet.add',
        params: (context) => {
          delete userWithoutAccount.accountName
          return userWithoutAccount
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            actorId: joi.string().required(),
            dob: joi.string().valid(userWithoutAccount.dob),
            firstName: joi.string().valid(userWithoutAccount.firstName),
            identifier: joi.string().required(),
            identifierTypeCode: joi.string(),
            lastName: joi.string().valid(userWithoutAccount.lastName),
            nationalId: joi.string().valid(userWithoutAccount.nationalId),
            password: joi.string().valid(userWithoutAccount.password),
            phoneNumber: joi.string().valid(userWithoutAccount.phoneNumber),
            role: joi.string(),
            roleName: joi.string().valid(userWithoutAccount.roleName)
          })).error, null)
        }
      },
      {
        name: 'Payee get without account',
        method: 'payee.get',
        params: (context) => {
          return {
            payee: userWithoutAccount.phoneNumber
          }
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.object().keys({
            account: joi.string().required().valid('http://localhost:8014/ledger/accounts/noaccount'),
            currencyCode: joi.string(),
            currencySymbol: joi.string(),
            dob: joi.string().required(),
            firstName: joi.string(),
            lastName: joi.string(),
            imageUrl: joi.string(),
            name: joi.string(),
            nationalId: joi.string(),
            type: joi.string()
          })).error, null)
        }
      },
      {
        name: 'Get for processing',
        method: 'bulk.payment.getForProcessing',
        params: (context) => {
          return {}
        },
        result: (result, assert) => {
          assert.equals(joi.validate(result, joi.array().required()).error, null)
        }
      },
      {
        name: 'Get for processing',
        method: 'transfer.push.execute',
        params: (context) => {
          return {}
        },
        error: (error, assert) => {
          assert.equals(error.errorPrint, 'You must provide either actorId or identifier', 'Check error message')
        }
      },
      {
        name: 'Get for processing',
        method: 'bulk.payment.execute',
        params: (context) => {
          return {}
        },
        error: (error, assert) => {
          assert.true(typeof error.errorPrint === 'string', 'Check error message')
        }
      }
    ])
  }
}, module.parent)
