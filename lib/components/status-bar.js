module.exports = {
  props:['status'],
  template:require('../templates/status-bar.html'),
  methods: {
    getForm: require('./methods/get-form'),
    showError: function(error) {

      var field = this.getForm().getField(error.name);

      if (error.hasOwnProperty('message'))
        return error.message.replace(":field",field.label);

      return field.getMessage(error.rule);
    },
    getLink: function(error) {

      return "#" +  error.name;
    },
     goToField: function(field) {
      this.$dispatch('vue-formular.clicked-error', field);
    }
  },
  computed: {
    errors: function() {
      if (this.showableErrors.length) {
        this.getForm().serverErrors = '';
        this.getForm().statusbarMessage = '';
        this.getForm().status = 'danger';
         return this.showableErrors;
      }

      if (this.getForm().serverErrors.length)
        return this.getForm().serverErrors;

      return [];
    },
     showableErrors: function() {

         var errors = [];

         if (!this.getForm().options.showClientErrorsInStatusBar)
          return [];

        this.getForm().errors.forEach(function(error) {
          if (error.show)
            errors.push(error);
        });

        return errors;
    },
    errorText: function() {

      var texts = this.getForm().options.texts;
      var count = this.showableErrors.length?this.showableErrors.length:this.getForm().serverErrors.length;

      if (count==1)
        return texts.singleError;

      return texts.errors.replace("{0}",count);
    }
  }
}
