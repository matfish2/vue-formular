
module.exports = function() {

    this.dirtyFields.forEach(function(field) {
      field.initialValue = typeof field.value=='object'?merge(field.value,{}):field.value;
      field.dirty = false;
    });
}
