module.exports = function() {
    if (!this.rules.remote) return;

    var formError = {
                      name:this.name,
                      rule:"remote",
                      show:true};

    this.$http.get(this.rules.remote, {value:this.value},function(valid) {

        if (valid) {
          this.errors.$remove('remote');
          this.removeFormError(formError);
        } else {
          console.log("invalid");
         if (this.errors.indexOf("remote")==-1)
            this.errors.push("remote");
            this.addFormError(formError,true);

        }
    });

  }
