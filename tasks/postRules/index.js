var rules = require('./rules')
module.exports = function (bus) {
  return bus.importMethod('rule.rule.fetch')({})
    .then(function (result) {
      return rules.filter(function (rule) {
        return !result.condition.some(function (condition) {
          return condition.operationTag === rule.condition.operationTag
        })
      })
    })
    .then(function (rules) {
      if (!rules.length) {
        return false
      }
      return bus.importMethod('rule.item.fetch')({})
        .then(function (items) {
          return Promise.all(rules.map(function (rule) {
            rule.condition.operationId = items.find(function (item) {
              return item.code === rule.condition.operationTag
            }).value
            rule.condition = [rule.condition]
            return bus.importMethod('rule.rule.add')(rule)
          }))
          .then(() => false)
        })
    })
}
