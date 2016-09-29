var joi = require('joi')
module.exports = {
  add: {
    description: 'Create wallet account',
    notes: 'Create wallet account based on phone number',
    params: joi.object({
      userNumber: joi.string(),
      name: joi.string(),
      phoneNumber: joi.string(),
      accountNumber: joi.string(),
      password: joi.string()
    }),
    result: joi.any()
  }
}
