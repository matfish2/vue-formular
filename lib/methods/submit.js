var getSubmitter = require('./get-submitter');

module.exports = function(e) {

  e.preventDefault();

  setTimeout(function() {

    if (this.errors.length>0)
      return handleErrors(this);

    if (this.sending || (this.options.sendOnlyDirtyFields && this.pristine)) {
      return false;
    }

    var beforeSubmit = this.options.beforeSubmit(this);

    if (typeof beforeSubmit=='boolean' && beforeSubmit) 
      return getSubmitter(this).submit(e);    

    var resolveMethod = beforeSubmit.done?'done':'then';
    var rejectMethod = beforeSubmit.catch?'catch':'fail';

    beforeSubmit[resolveMethod](function() {
      return getSubmitter(this).submit(e);        
    }.bind(this))
    [rejectMethod](function() {

    });
  }.bind(this),0);
}

function handleErrors(vm) {
 vm.showAllErrors();
 vm.$dispatch('vue-formular.invalid.client', vm.errors);
 return false;
}
