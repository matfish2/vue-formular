var getSubmitter = require('./get-submitter');

module.exports = function(e) {

  if (this.errors.length>0)
    return handleErrors(e, this);

  if (this.sending || (this.options.sendOnlyDirtyFields && this.pristine)) {
    e.preventDefault();
    return false;
  }

  return getSubmitter(this).submit(e);

}

 function handleErrors(e, vm) {
   vm.showAllErrors();
   e.preventDefault();
   vm.$dispatch('vue-formular.invalid.client', vm.errors);
   return false;
 }
