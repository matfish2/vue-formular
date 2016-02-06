var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');

module.exports = {
  template:render_template('form-group',{
    field:render_template('buttons-list'),
    fieldType:'List'
  }),
  props: {
    items: {
      type:Array,
      required:true
    },
    multiple:{
      type: Boolean,
      required:false,
      default:false
    },
    value: {
      required:false,
      default:function() {
        return [];
      }
    }
  },
  mixins:[props,data, methods, computed,ready],
  computed: {
    type: function() {
      return this.multiple?"checkbox":"radio";
    },
    arraySymbol: require('../computed/array-symbol')
  }
}

