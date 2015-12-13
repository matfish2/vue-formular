var isValidDate = require('../helpers/is-valid-date');

module.exports = function(old) {

  if (!(this.day && this.month && this.year)) return;

 var date = isValidDate(this.day, this.month, this.year);
 if (!date) {
  this.errors.pushUnique("date");
 this.$parent.errors.pushUnique(this.name + ":date");
this.hadErrors = true;
 } else {

  this.errors.$remove('date');
 this.$parent.errors.$remove(this.name + ":date");
 this.value = date;
 }
}
