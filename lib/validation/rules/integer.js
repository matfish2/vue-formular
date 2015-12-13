module.exports = function(that) {
  return !isNaN(that.value) && that.value%1===0;
}
