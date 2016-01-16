var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');
var merge = require('merge');

module.exports = {
  template:render_template('form-group',{
    field:render_template('select'),
    fieldType:'Select'
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
    select2: {
      required: false,
      default: false
    },
    placeholder: {
      type:String,
      required:false,
      default:'Select Option'
    }
  },
  ready: function() {
    var that = this;

    if (this.select2 && typeof $!='undefined') {

      var options = {
        placeholder:this.placeholder
      };

      if (typeof this.select2=='object')
        options = merge(this.select2, options);

      $(this.$el).find("select")
      .select2(options)
      .on("change",function(val){
        that.value = $(this).val();
      });
    }

  },
  mixins:[props,data, methods, computed,ready],
}

