var validator = require('../../validation/rules/*.js',{mode:'hash'})
var merge_options = require('../../helpers/merge-options');

module.exports = function() {
   var formError;
   var isValid;

  validator = merge_options(validator, this.$parent.options.customRules);
      for (var rule in this.rules) {

        if (validator[rule]) {

         isValid = (!this.value && rule!='required' && rule!='requiredIf') || validator[rule](this);
         formError = {
                      name:this.name,
                      rule:rule,
                      show:this.dirty
          };

         if (isValid) {
          this.errors.$remove(rule);
          console.log("removing");
          this.removeFormError(formError);
        } else {

          if (this.dirty)  {
            if (this.errors.indexOf(rule)==-1)
            this.errors.push(rule);
          }
          console.log(formError);
            this.addFormError(formError,this.dirty);
        }

      }

    }

    if (this.errors.length) this.hadErrors = true;
}
