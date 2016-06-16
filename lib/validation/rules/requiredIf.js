module.exports = function(that) {

  if (!that.inForm()) return true;

  var params = that.rules.requiredIf.split(":");
  var otherField = params[0];
  var values = params.length>1?params[1].split(","):false;

  var otherField =that.$parent.getField(otherField);

  var required = isRequired(values,otherField.value);

  that.isRequired = required;

  that.shouldShow = required;

  return that.value || that.fieldType=='checkbox' || !required;
}

function isRequired(values, otherFieldValue) {

  if (!values) return !!otherFieldValue;

  var value = typeof otherFieldValue == 'object'?otherFieldValue:[otherFieldValue];

  return !!values.filter(function(n) {
    return value.indexOf(n) != -1;
}).length;

}

