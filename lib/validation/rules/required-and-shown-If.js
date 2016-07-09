var requiredIfBase = require('./required-if-base');

module.exports = function(that) {

  var required = requiredIfBase(that,'requiredAndShownIf');
console.log(that.name + " : " + required);
  that.shouldShow = required;

  return that.value || that.fieldType=='checkbox' || !required;

}

