var requiredIfBase = require('./required-if-base');

module.exports = function(that) {

  var required = requiredIfBase(that,'requiredAndShownIf');

  that.shouldShow = required;

  return that.value || that.fieldType=='checkbox' || !required;

}
