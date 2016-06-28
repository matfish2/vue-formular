var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(), {
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
      editor: null,
      fieldType:'textarea'
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
});
}
