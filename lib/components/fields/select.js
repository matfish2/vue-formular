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
      required: false
    },
    placeholder: {
      type:String,
      required:false,
      default:'Select Option'
    }
  },
  ready: function() {
    var that = this;
    var value;

    if (typeof this.select2!='undefined' && typeof $!='undefined') {

      var options = {
        placeholder:this.placeholder
      };

      if (typeof this.select2=='object')
        options = merge.recursive(this.select2, options);

      $(this.$el).find("select")
      .select2(options)
      .on("change",function(e){

        value = $(this).val();

        if (!value && that.multiple)
          value = [];

        that.value = value;
      });
    }

  },
  computed: {
    arraySymbol: require('../computed/array-symbol')
  },
  mixins:[props,data, methods, computed,ready],
}

