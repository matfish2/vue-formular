module.exports = {
  props:['status'],
  template:require('../templates/status-bar.html'),
  methods: {
    showError: function(error) {

      var field = this.$parent.getField(error.name);

      if (error.hasOwnProperty('message'))
        return error.message.replace(":field",field.label);

      return field.getMessage(error.rule);
    },
    getLink: function(error) {

      return "#" +  error.name;
    }
  },
  computed: {
    errors: function() {
      if (this.showableErrors.length) {
        this.$parent.serverErrors = '';
        this.$parent.statusbarMessage = '';
        this.$parent.status = 'danger';
         return this.showableErrors;
      }

      if (this.$parent.serverErrors.length)
        return this.$parent.serverErrors;

      return [];
    },
     showableErrors: function() {

         var errors = [];

         if (!this.$parent.options.showClientErrorsInStatusBar)
          return [];

        this.$parent.errors.forEach(function(error) {
          if (error.show)
            errors.push(error);
        });

        return errors;
    },
    errorText: function() {

      var texts = this.$parent.options.texts;
      var count = this.showableErrors.length?this.showableErrors.length:this.$parent.serverErrors.length;

      if (count==1)
        return texts.singleError;

      return texts.errors.replace("{0}",count);
    }
  }
}
