module.exports = function(field) {
	
	if (!field.value.split) return true;

	    var values = field.value.split('-');
		return moment(values[0], this.format).isValid() 
			&& moment(values[1], this.format).isValid();
}