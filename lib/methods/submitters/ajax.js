module.exports = function(vm) {
  return {
    submit: function(e) {
      e.preventDefault();
      vm.$dispatch('vue-formular.sending');
      var data = vm.formData();

      vm.serverErrors = '';
      vm.status = 'info';
      vm.statusbarMessage = vm.options.texts.sending;

      vm.$http[vm.method.toLowerCase()](vm.action,{params:data}).then(function(data){

        vm.reinitForm();
        vm.$dispatch('vue-formular.sent', data);
        vm.status = 'success';

        vm.statusbarMessage = typeof data.data=='string'?data.data:vm.options.texts.sent;

        setTimeout(function() {
          vm.statusbarMessage = '';
        }, vm.options.successTimeout);

      })
      .catch(function(response) {

        vm.$dispatch('vue-formular.invalid.server', response);
        vm.status = 'danger';

        var errors = response.data;

        if (typeof errors=='string') {
         vm.statusbarMessage = errors;
         return;
       }

       if (typeof errors=='object')
         errors.forEach(function(error, i) {
          errors[i].show = true;
        });
       vm.statusbarMessage= '';
       vm.serverErrors = errors;

     });

      return true;
    }
  }
}
