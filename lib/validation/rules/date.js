module.exports = function(field) {

		if (typeof field.value=='object') return true;
		
		var format = field.isTimepicker &&
					 field.value &&
					 field.value.split(" ").length==1?
					 field.format.split(" ")[0]:
					 field.format;

		return moment(field.value, format).isValid();
}
