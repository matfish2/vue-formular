module.exports = function(vm) {
  return {
    submit: function(e) {
      e.preventDefault();
      var data = vm.formData();
      vm.reinitForm();
      vm.$dispatch('vue-formular.sent', data);
      vm.status = 'success';
      vm.statusbarMessage = vm.options.texts.sent;
      return true;
    }
  }
}
