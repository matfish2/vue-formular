module.exports = function(that) {

  if (!that.inForm()) return true;

  var params = that.rules.requiredIf.split(":");
  var otherField = params[0];
  var values = params.length>1?params[1].split(","):false;

  var otherField =that.$parent.getField(otherField);

  var required = isRequired(values,otherField.value);

  that.shouldShow = required;

  return that.value || !required;
}

function isRequired(values, otherFieldValue) {

  if (!values) return !!otherFieldValue;

  var value = typeof otherFieldValue == 'object'?otherFieldValue:[otherFieldValue];

  return !!intersect(value, values).length;
}


function intersect(a, b)
{
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++; }
     else if (a[ai] > b[bi] ){ bi++; }
     else /* they're equal */
     {
       result.push(a[ai]);
       ai++;
       bi++;
     }
  }

  return result;
}
