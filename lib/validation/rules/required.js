var isNumeric = require('../../helpers/is-numeric');

module.exports = function(that) {

  if (!that.rules.required) {
    return true;
  }

  return !!(that.value && (typeof that.value=='object' ||
                          isNumeric(that.value) ||
                          that.value.trim().length>0));
}

