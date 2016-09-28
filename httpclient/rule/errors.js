var create = require('ut-error').define
var GeneralApiError = require('../generalApiError');
var Rule = create('rule', GeneralApiError)

module.exports = {
  rule: function (cause) {
    return new Rule(cause)
  }
}
