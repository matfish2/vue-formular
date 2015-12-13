module.exports = {
  template:require('../templates/submit.html'),
  computed: {
    disabled: function() {
      return false; //this.$parent.errors.length;
    }
  }
}
