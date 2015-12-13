module.exports = function() {

console.log("Errors ", this.errors.length);
  return !this.rules.requiredIf || !!this.errors.length;
}
