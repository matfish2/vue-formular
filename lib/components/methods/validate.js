var validator = require('../../validation/rules/*.js',{mode:'hash'})
var merge_options = require('../../helpers/merge-options');

module.exports = function() {
   var formError;
   var isValid;

  validator = merge_options(validator, this.$parent.options.customRules);
      for (var rule in this.rules) {

        if (validator[rule]) {

         isValid = (!this.value && rule!='required' && rule!='requiredIf') || validator[rule](this);
         formError = this.name + ":" + rule;

         if (isValid) {
           this.errors.$remove(rule);
          this.$parent.errors.$remove(formError);

        } else {

          if (this.dirty) this.errors.pushUnique(rule);
            this.$parent.errors.pushUnique(formError);
        }

      }

    }

    if (this.errors.length) this.hadErrors = true;
}
