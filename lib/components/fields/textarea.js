var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');
var merge = require('merge');
var clone = require('clone');

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
    },
    disabled: {
      type: Boolean
    },
    tinymce:{
      default: false
    },
    debounce:{
      type:Number,
      default:300
    }
  },
  data: function() {
    return {
      editor: null
    }
  },
  ready: function() {

    if (this.tinymce===false) return;

    var that = this;

    var setup = that.tinymce && that.tinymce.hasOwnProperty('setup')?
                that.tinymce.setup:
                function() {};

    var parentSetup = that.$parent.options.tinymceOptions.hasOwnProperty('setup')?
    that.$parent.options.tinymceOptions.setup:
    function(){};

    var options = typeof this.tinymce=='object'?
    merge.recursive(clone(this.$parent.options.tinymceOptions), this.tinymce):
    this.$parent.options.tinymceOptions;



    options = merge.recursive(options, {
      selector:'textarea[name=' + this.name +']',
      setup : function(ed) {

      that.editor = ed;
      parentSetup(ed);
      setup(ed);

        ed.on('change',function(e) {
          that.value = ed.getContent();
        }.bind(this));

      }
    });

    tinymce.init(options);
    this.$watch('value', function(val) {
      tinymce.get("textarea_" + this.name).setContent(val);
    });

  }
}

