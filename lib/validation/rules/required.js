module.exports = function(that) {

  if (!that.rules.required) {
    return true;
  }

  return !!(that.value && (typeof that.value=='object' || that.value.length>0)); //.trim();
}
