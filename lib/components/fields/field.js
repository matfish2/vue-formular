var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');

module.exports = function() {
	return {
		template: require('../../templates/field.html'),
		mixins:[props,data, methods, computed, ready],
		computed: {
			partial: function() {
				return ['text','email','password','number'].indexOf(this.fieldType)>-1?'input':this.fieldType;
			}
		},
		methods: {
			setValue: function(value) {
				this.value = value;
				this.dirty = true;
			},			
			focus: function() {
				this.$el.getElementsByTagName(this.tagName)[0].focus();
			}
		}
	}
}
