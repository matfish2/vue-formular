var getValue = require('./get-comparative-rule-value');

module.exports = function(that, gt) {

	if (!that.value)
		return true;

	var type = gt?'greaterThan':'smallerThan';
	
	var fields = that.rules[type].split(",");

	return fields.filter(function(field){

		var otherField = that.getField(field);

		if (!otherField || !otherField.value)
			return true;

		var value1 = getValue(that.value);
		var value2 = getValue(otherField.value);

		return gt?value1 > value2:value1 < value2;

	}).length===fields.length;

}
