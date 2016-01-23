var clone = require('clone');

module.exports = function() {

    this.dirtyFields.forEach(function(field) {
      field.initialValue = clone(field.value);
      field.dirty = false;
    });
}
