var hasValue = require('./has-value');

module.exports = function(that) {

  if (!that.rules.required) {
    return true;
  }

  return hasValue(that);
}

