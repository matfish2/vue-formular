module.exports = function(vm) {
  return {
    submit: function(e) {
      if (e) e.preventDefault();
      vm.sending = true;
      vm.$dispatch('vue-formular.sending');
      var data = vm.formData();

      vm.serverErrors = '';
      vm.status = 'info';
      vm.statusbarMessage = vm.options.texts.sending;

      var method = vm.method.toLowerCase();
      vm.$http[method](vm.action,getData(method, data)).then(function(data){

        vm.reinitForm();
        vm.$dispatch('vue-formular.sent', data);
        vm.status = 'success';
        vm.sending = false;
        
        vm.statusbarMessage = typeof data.data=='string'?data.data:vm.options.texts.sent;

        setTimeout(function() {
          vm.statusbarMessage = '';
        }, vm.options.successTimeout);

      })
      .catch(function(response) {

        vm.$dispatch('vue-formular.invalid.server', response);
        vm.status = 'danger';
        vm.sending = false;

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


function getData(method, data) {
  return ['head','get','delete'].indexOf(method)>-1?{params:data}:data;
}
