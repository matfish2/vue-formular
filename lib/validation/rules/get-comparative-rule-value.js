var isNumeric = require('../../helpers/is-numeric');

module.exports = function(value) {
	if (typeof value=='object')
		return value;

	if (isNumeric(value))
		return parseFloat(value);

	return moment(value);
}