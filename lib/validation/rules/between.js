module.exports = function(that) {

  var value = that.rules.number ||
              that.rules.integer||
               typeof that.rules.between[0]=='object'? // moment objects
               that.value:
               that.value.length;

  if (that.rules.number || that.rules.integer) value = parseFloat(value);

  return (value>=that.rules.between[0] && value<=that.rules.between[1]);
}
