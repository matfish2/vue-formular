module.exports = function(that) {

  var value = that.rules.number
              || that.rules.integer
              || typeof that.rules.min=='object'? // moment object
              that.value:
              that.value.length;

  if (that.rules.number || that.rules.integer) value = parseFloat(value);

  return (value>=that.rules.min);
}
