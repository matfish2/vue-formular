// Types: text, email, number

var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');

module.exports = {
  template:render_template('form-group',{
    field:render_template('checkbox'),
    fieldType:'Checkbox'
  }),
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  ready: function() {
    this.value =  this.checked;
  },
  mixins:[props,data, methods, computed,ready]
}

