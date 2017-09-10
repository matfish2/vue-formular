var merge = require('merge');
var clone = require('clone');
var Field = require('./field');
var maxCounter = require('../mixins/max-counter');


module.exports = function() {
  return merge.recursive(Field(), {
  mixins:[maxCounter],
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
    },
    lazy:{
      type:Boolean
    },
    toggler:{
      type:Boolean
    },
    togglerButton:{
      type:Object,
      default:function() {
        return {
          expand:'Expand',
          minimize:'Minimize'
        }
      }
    }
  },
  data: function() {
    return {
      editor: null,
      expanded:false,
      fieldType:'textarea',
      tagName:'textarea'
    }
  },
  methods:{
      toggle: function() {
        this.expanded=!this.expanded;
        var textarea = $(this.$el).find("textarea");
        height = this.expanded?textarea.get(0).scrollHeight:"auto";
        textarea.height(height);
        this.$dispatch('vue-formular.textarea-was-toggled', {expanded:this.expanded});
      }
  },
  computed:{
    togglerText: function() {
        return this.expanded?this.togglerButton.minimize:this.togglerButton.expand;
    }
  },
  ready: function() {

    if (this.tinymce===false) return;

    var that = this;

    var setup = that.tinymce && that.tinymce.hasOwnProperty('setup')?
                that.tinymce.setup:
                function() {};

    var parentSetup = that.getForm().options.tinymceOptions.hasOwnProperty('setup')?
    that.getForm().options.tinymceOptions.setup:
    function(){};

    var options = typeof this.tinymce=='object'?
    merge.recursive(clone(this.getForm().options.tinymceOptions), this.tinymce):
    this.getForm().options.tinymceOptions;



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
  if(val != tinymce.get("textarea_" + this.name).getContent()) {
      tinymce.get("textarea_" + this.name).setContent(val);
  }
    });

  }
});
}
