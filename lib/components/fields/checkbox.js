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
      default:undefined
    }
  },
  created: function() {
    this.fieldType = 'checkbox';
  },
  ready: function() {

    if (typeof this.checked=='undefined') {
      this.value = false;
      this.dirty = true;
    }
  },
  computed: {
    value: {
      get:function() {
        return this.checked;
      },
      set:function(val) {
        this.checked= val!=0;
      }
    } 
  },
  data: function() {
    return {
      initialValue: this.checked
    }
  },
  mixins:[props,data, methods, computed,ready]
}

