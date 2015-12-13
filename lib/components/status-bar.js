module.exports = {
  props:['status'],
  template:require('../templates/status-bar.html'),
  methods: {
    isString: function(message) {
      return typeof message=='string';
    },
    showError: function(error) {

      var field = this.$parent.getField(error.name);

      return field.getMessage(error.rule);
    },
    getLink: function(error) {

      return "#" +  error.name;
    }
  },
  computed: {
    content: function() {

      if (this.$parent.statusbarContent)
        return this.$parent.statusbarContent;

      if (this.showableErrors.length)
        return this.showableErrors;

      return '';
    },
     showableErrors: function() {

         var errors = [];

        this.$parent.errors.forEach(function(error) {
          if (error.show)
            errors.push(error);
        });

        return errors;
    }
  }
}
