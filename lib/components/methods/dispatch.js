module.exports = function(event, payload) {
	event = "vue-formular." + event;
	this.$dispatch(event, payload);
}