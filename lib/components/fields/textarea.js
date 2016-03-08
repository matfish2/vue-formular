var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');

module.exports = {
  template:render_template('form-group',{
    field:render_template('textarea'),
    fieldType:'Textarea'
  }),
  mixins:[props,data, methods, computed,ready],
    created: function() {
    this.fieldType = 'textarea';
  },
  props: {
    placeholder: {
      type:String,
      required:false,
      default:''
    }
  }
}

