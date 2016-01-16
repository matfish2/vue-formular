var merge = require('merge');

module.exports = function() {
  var data = {};
  var value;

  this.$children.forEach(function(field) {
    if (field.name) {

      data[field.name] = field.value;

    }
  });

  data = merge(data,this.options.additionalPayload);

  return data;
}
