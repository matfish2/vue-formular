module.exports = function(that) {

  var value = that.rules.number
              || that.rules.integer
              || typeof that.rules.min=='object'? // moment object
              that.value:
              that.value.length;

  return (value>=that.rules.min);
}
