module.exports = function(that) {

  return !!(that.value && (typeof that.value=='object' || that.value.length>0)); //.trim();
}
