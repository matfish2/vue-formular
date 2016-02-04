module.exports = function() {

  if (this.errors.length>0) {
    this.showAllErrors();
    return false;
  }

  if (this.pristine) return false;

  var data = this.formData();

  this.$dispatch('vue-formular.sending', data);
  this.status = 'info';
  this.statusbarMessage = this.options.texts.sending;

  this.$http[this.method.toLowerCase()](this.action,data).then(function(data){

    this.reinitForm();
    this.$dispatch('vue-formular.sent', data);
    this.status = 'success';

    this.statusbarMessage = typeof data.data=='string'?data.data:this.options.texts.sent;

  }.bind(this))
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

}.bind(this));

}
