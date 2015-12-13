module.exports = function() {

        if (this.errors.length>0) return false;

        var data = this.formData();
        this.$dispatch('vue-formular.sending', data);
        this.status = 'info';
        this.statusbarContent = this.options.sendingText;

        this.$http[this.method.toLowerCase()](this.action,data,function(data){
        //  console.log(data);
        this.$dispatch('vue-formular.sent', data);
          this.status = 'success';
          this.statusbarContent = data;
        })
        .error(function(errors) {
        this.$dispatch('vue-formular.error', data);
             this.status = 'danger';
             this.errors = errors;
        });
      }
