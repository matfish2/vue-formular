var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(),{
    data: function() {
      return {
        fieldType:'file',
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
      }
    },
    ready: function() {

      if (!this.ajax) return;

      var parentOptions = this.inForm()?clone(this.$parent.options.fileOptions):{};
      var options = merge.recursive(parentOptions, this.options);

      if (!options.hasOwnProperty("formData")) options.formData = {};

      options.formData.rules = JSON.stringify(this.rules);

      $(this.$el).find("input[type=file]").fileupload(options);

    }
  });
}


