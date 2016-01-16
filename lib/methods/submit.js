module.exports = function() {

  if (this.errors.length>0) {
    this.showAllErrors();
    return false;
  }

  var data = this.formData();
  this.$dispatch('vue-formular.sending', data);
  this.status = 'info';
  this.statusbarMessage = this.options.texts.sending;

  this.$http[this.method.toLowerCase()](this.action,data,function(data){

    this.$dispatch('vue-formular.sent', data);
    this.status = 'success';
    this.statusbarMessage = data;
  })
  .catch(function(response) {

    this.$dispatch('vue-formular.invalid', response);
    this.status = 'danger';

    var errors = response.data;

    if (typeof errors=='string') {
       this.statusbarMessage = errors;
       return;
    }

 if (typeof errors=='object')
     errors.forEach(function(error, i) {
      errors[i].show = true;
    });
     this.statusbarMessage= '';
     this.serverErrors = errors;

});

}
