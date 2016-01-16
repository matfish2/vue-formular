module.exports = {
  props:['status'],
  template:require('../templates/status-bar.html'),
  methods: {
    isString: function(message) {
      return typeof message=='string';
    },
    showError: function(error) {

      if (error.hasOwnProperty('message'))
        return error.message;

      var field = this.$parent.getField(error.name);

      return field.getMessage(error.rule);
    },
    getLink: function(error) {

      return "#" +  error.name;
    }
  },
  computed: {
    content: function() {

      if (this.$parent.statusbarMessage && !this.showableErrors.length)
        return this.$parent.statusbarMessage;

      if (this.$parent.serverErrors.length && !this.showableErrors.length) {
        return this.$parent.serverErrors;
      }

      if (this.showableErrors.length) {
        this.$parent.status = 'danger';
        this.$parent.statusbarMessage = '';
        this.$parent.serverErrors = [];
        return this.showableErrors;
      }

      return '';
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
