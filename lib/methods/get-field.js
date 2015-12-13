module.exports = function(name) {
  var res;
  for (var i=0;i<this.$children.length;i++) {
      if (this.$children[i].name===name) {
        res = this.$children[i];
        break;
      }
  }

  return res;
}
