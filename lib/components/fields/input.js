// Types: text, email, number

var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');

module.exports = function(template, replacements) {

 return {
  template:render_template('form-group',{
    field:render_template(template,replacements),
    fieldType:replacements.type.ucfirst()
  }),
  ready: function() {

    var type = replacements.type;

    if (['number','email'].indexOf(type)>-1)
      this.rules[type] = true;
  },
  mixins:[props,data, methods, computed,ready],
  props: {
    placeholder: {
      type:String,
      required:false,
      default:''
    }
  }
}
}
