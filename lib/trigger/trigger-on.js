module.exports = function(that, trigger, values) {

  if (!trigger) return true;

  var triggerValue = trigger.value;

  if (!values) return !!triggerValue;

  if (triggerValue==null) return false;

  values = values.split(",").map(function(value) {
  	if (value==='true') return true;
  	if (value==='false') return false;
  	return value;
  });

  var value = typeof triggerValue == 'object'?triggerValue:[triggerValue];
  return !!values.filter(function(n) {
    return value.indexOf(n) != -1;
  }).length;

}

