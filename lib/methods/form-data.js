var dateformat = require('dateformat');

module.exports = function() {
        var data = {};
        var value;

        this.$children.forEach(function(field) {
          if (field.name) {
            console.log(field.value);
            value = field.value instanceof Date?dateformat(field.value,'dd-mm-yyyy'):field.value;
            data[field.name] = value;

          }
        });
        return data;
      }
