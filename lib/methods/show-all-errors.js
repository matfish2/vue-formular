module.exports = function() {
  this.errors.forEach(function(error) {
    error.show = true;
  });
}
