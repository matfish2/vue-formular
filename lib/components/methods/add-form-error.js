module.exports = function(item, show, rule) {
    var unique = true;

    this.$parent.errors.forEach(function(error, i) {
      if (error.name==item.name && error.rule==rule) {
        this.$parent.errors[i].show = show;
        unique = false;
      }
    }.bind(this));

   if (unique)
     this.$parent.errors.push(item);

}
