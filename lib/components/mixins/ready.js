module.exports = {
  ready: function() {

    if (!this.$parent.validation)
      return;

    var form = this.$parent;
    var v = this.$parent.validation;

    if (v.rules && v.rules.hasOwnProperty(this.name))
      this.rules = v.rules[this.name];
    if (typeof v.messages!='undefined' &&  v.messages.hasOwnProperty(this.name))
      this.messages = v.messages[this.name];

    this.validate();

    if (this.rules.requiredIf && !this.errors.length) this.shouldShow=false;

    if (form.relatedFields.hasOwnProperty(this.name))
       var foreignField = form.getField(form.relatedFields[this.name]);

    this.$watch('value', function(newVal, oldVal) {

      this.$dispatch('vue-formular.change::' + this.name, {value:newVal, oldValue:oldVal});

      if (typeof foreignField!='undefined') {
       foreignField.validate();
      }

      this.dirty = true;
      this.validate();
    });



  }

}
