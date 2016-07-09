module.exports = function() {
  var triggers = this.$parent.triggers;
  return triggers.hasOwnProperty(this.name)?triggers[this.name]:false;
}
