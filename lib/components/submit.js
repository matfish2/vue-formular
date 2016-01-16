module.exports = {
  template:require('../templates/submit.html'),
  props: {
    text: {
      type: String,
      required:false,
      default:'Submit'
    }
  },
  computed: {
    disabled: function() {
      return false; //this.$parent.errors.length;
    }
  }
}
