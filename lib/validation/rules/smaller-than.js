var getValue = require('./get-comparative-rule-value');

module.exports = function(that) {

  if (!that.value)
    return true;

  var otherField = that.getField(that.rules.smallerThan);

  if (!otherField || !otherField.value)
    return true;

  var value1 = getValue(that.value);
  var value2 = getValue(otherField.value);

  return value1 < value2;
}
