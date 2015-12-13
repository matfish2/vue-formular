module.exports = function(that) {

  var params = that.rules.requiredIf.split(":");
  var otherField = params[0];
  var values = params.length>1?params[1].split(","):false;

  var otherField =that.$parent.getField(otherField);

  var condition = values?values.indexOf(otherField.value)==-1:!otherField.value;

  return that.value.trim() || condition;
}
