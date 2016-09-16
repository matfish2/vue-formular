var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(),{
    data: function() {
      return {
        fieldType:'file'
      }
    },
    props: {
      options: {
        type: Object,
        required:false,
        default: function() {
          return {};
        }
      },
      ajax: {
        type: Boolean
      },
      dest: {
        type: String,
        default: '/'
      },
      done: {
        type: Function
      },
      error: {
        type: Function
      },
      valueKey: {
        type: String,
        default: 'value'
      }
    },
    ready: function() {

      if (!this.ajax) return;

      var self = this;
      var parentOptions = this.inForm()?clone(this.getForm().options.fileOptions):{};
      var options = merge.recursive(parentOptions, this.options);

      if (!options.hasOwnProperty("formData")) options.formData = {};

      options.formData.rules = JSON.stringify(this.rules);

      if (!options.formData.hasOwnProperty('dest')) {
        options.formData.dest = this.dest;
      }

      if (!options.hasOwnProperty('done')) {
        options.done = this.done?this.done:function(e, data) {
         self.setValue(data.result[self.valueKey]);
       }
     }

     if (!options.hasOwnProperty('error')) {
      options.error = this.error?this.error:function(e, data) {
        bootbox.alert(e.responseJSON.error.message);
      }
    }

    $(this.$el).find("input[type=file]").fileupload(options);

  }
});
}


