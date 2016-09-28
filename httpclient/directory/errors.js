var create = require('ut-error').define
var GeneralApiError = require('../generalApiError');
var Directory = create('directory', GeneralApiError)

module.exports = {
  directory: function (cause) {
    return new Directory(cause)
  }
}
