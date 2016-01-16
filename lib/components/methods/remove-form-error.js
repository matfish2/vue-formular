module.exports = function(item) {

   var index;

    this.$parent.errors.forEach(function(error, i) {
      if (error.name==item.name && error.rule==item.rule) {
       index = i;
      }
    });

    if (index>=0) this.$parent.errors.splice(index,1);


}
