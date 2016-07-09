var requiredIfBase = require('./required-if-base');

module.exports = function(that) {

  var required = requiredIfBase(that,'requiredIf');

  return that.value || that.fieldType=='checkbox' || !required;

}
