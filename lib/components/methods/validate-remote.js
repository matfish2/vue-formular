module.exports = function() {
    if (!this.rules.remote) return;

    this.$http.get(this.rules.remote, {value:this.value},function(valid) {

        if (valid) {
          this.errors.$remove('remote');
          this.$parent.errors.$remove(this.name + ':remote');
        } else {
        this.errors.pushUnique('remote');
        this.$parent.errors.pushUnique(this.name + ':remote');
        }
    }).error(function(e) {

    });
  }
