module.exports = function(that) {

  var value = that.rules.number  || that.rules.integer?that.value:that.value.length;

  return (value<=that.rules.max);
}
