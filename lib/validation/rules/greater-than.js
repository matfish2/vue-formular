module.exports = function(that) {

  if (!that.value)
    return true;

  var otherField = that.getForm().getField(that.rules.greaterThan);

  if (!otherField || !otherField.value)
    return true;

  var value1 = !!isNaN(that.value) || typeof that.value=='object'?that.value:parseFloat(that.value);
  var value2 = !!isNaN(otherField.value) || typeof otherField.value=='object'?otherField.value:parseFloat(otherField.value);

  return value1 > value2;

}
