module.exports = function(that) {
  var otherField =that.$parent.getField(that.rules.greaterThan);

  return !otherField.value || (that.value > otherField.value);
}
