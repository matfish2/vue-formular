module.exports = function(field) {
		return moment(field.value, this.format).isValid();
}