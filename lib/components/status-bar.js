module.exports = {
  props:['status'],
  template:require('../templates/status-bar.html'),
  methods: {
    isString: function(message) {
      return typeof message=='string';
    },
    showError: function(error) {
      error = error.split(":");
      var field = error[0];
      var rule = error[1];
      field = this.$parent.getField(field);

      return field.getMessage(rule);
    },
    getLink: function(error) {
      return "#" +  error.split(":")[0];
    }
  },
  computed: {
    content: function() {
      if (this.$parent.statusbarContent) return this.$parent.statusbarContent;
      if (this.$parent.errors.length) return this.$parent.errors;
      return '';
    }
  }
}
