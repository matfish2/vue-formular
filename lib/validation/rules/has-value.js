var isNumeric = require('../../helpers/is-numeric');

module.exports = function(that) {

return !!(that.value && (isString(that.value) ||
                          that.fieldType=='checkbox' ||
                          that.fieldType=='date' ||
                          isMultipleList(that) ||
                          isNumeric(that.value)));
}

function isMultipleList(that) {
  return (that.fieldType=='select' || that.fieldType=='buttons') &&
          that.multiple &&
          that.value.length>0;
}

function isString(value) {
  return typeof value=='string' && value.trim().length>0;
}
