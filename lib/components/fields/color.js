var merge = require('merge');
var Input = require('./input');

module.exports = function() {
	return merge.recursive(Input(), {
		data:function() {
			return {
				fieldType:'color',
				useSpectrum:!browserSupportsColorpicker()
			}
		},
		ready: function() {
			if (this.useSpectrum) {

				var that = this;

				if (!that.value) that.reset();

				$(this.$el).find("input[type=color]").spectrum({
					color: that.value,
					change: function(color) {
						setTimeout(function() {
							that.value = color.toHexString();					
						},100);
					}
				});

			} 
		}, 
		methods:{
			setValue: function(value) {
				
				var val = typeof value==='object'?value.toHexString():value;
				
				if (this.useSpectrum)
				 $(this.$el).find("input[type=color]").spectrum("set", val);

				this.value = val;
				this.dirty = true;
			},
			reset: function() {
				this.wasReset = true;
				this.value = '#000000';
			}
		}
	});

}


function browserSupportsColorpicker() {
	var colorInput;
	colorInput = $('<input type="color" value="!" />')[0];
	return colorInput.type === 'color' && colorInput.value !== '!';
}
