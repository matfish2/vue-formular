var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');

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
      type: Boolean,
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

    if (this.select2 && typeof $!='undefined')
      $(this.$el).find("select").select2({placeholder:this.placeholder}).on("change",function(val){
        that.value = $(this).val();
      });
  },
  mixins:[props,data, methods, computed,ready],
}

