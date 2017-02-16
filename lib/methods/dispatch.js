module.exports = function(event, payload) {
	var pieces = event.split("::");
	var eventName = pieces[0];
	pieces[0] = this.name?this.name +  "." + eventName:eventName;
	event = "vue-formular." + pieces.join('::');

	this.$dispatch(event, payload);
}
