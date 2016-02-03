var validator = require('../../validation/rules/*.js',{mode:'hash'})
var merge = require('merge');

function shouldShow(that, rule) {
    return !that.pristine || ['greaterThan','smallerThan'].indexOf(rule)>-1;
}

module.exports = function() {
   var formError;
   var isValid;

  validator = merge.recursive(validator, this.$parent.options.customRules);

      for (var rule in this.rules) {

        if (validator[rule]) {

         isValid = (!this.value && rule!='required' && rule!='requiredIf') || validator[rule](this);

         formError = {
                      name:this.name,
                      rule:rule,
                      show:shouldShow(this, rule)
          };

         if (isValid) {
          this.errors.$remove(rule);

          if (this.inForm()) this.removeFormError(formError);
        } else {

          if (shouldShow(this, rule))  {
            if (this.errors.indexOf(rule)==-1)
            this.errors.push(rule);
          }

            if (this.inForm()) this.addFormError(formError,!this.pristine);
        }

      }

    }

    if (this.errors.length) this.hadErrors = true;
}
