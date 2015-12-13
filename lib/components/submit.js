module.exports = {
  template:require('../templates/submit.html'),
  computed: {
    disabled: function() {
      return this.$parent.errors.length;
    }
  }
}
