var merge = require('merge');

module.exports = function() {
  var data = {};
  var value;

  this.dirtyFields.forEach(function(field) {
      data[field.name] = field.value;
  });

  data = merge.recursive(data,this.options.additionalPayload);

  return data;
}
