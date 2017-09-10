module.exports = {
  computed:{
    lettersCount() {
      return this.value?this.value.length:0;
    },
    hasMax: function() {
      return !!(this.rules.max || this.rules.between);
    },
    max: function() {
      if (!this.hasMax) return false;
      return this.rules.max?this.rules.max:this.rules.between[1];
    }
  }
}
