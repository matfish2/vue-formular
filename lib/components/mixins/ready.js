module.exports = {
  ready: function() {
    if (this.$parent.validation.rules[this.name])
      this.rules = this.$parent.validation.rules[this.name];
    if (this.$parent.validation.messages[this.name])
      this.messages = this.$parent.validation.messages[this.name];

    this.validate();

    if (this.rules.requiredIf && !this.errors.length) this.shouldShow=false;

    if (this.$parent.relatedFields.hasOwnProperty(this.name))
       var foreignField = this.$parent.getField(this.$parent.relatedFields[this.name]);

    this.$watch('value', function(oldVal, field) {

      if (typeof foreignField!='undefined') {
       foreignField.validate();
      }

      this.dirty = true;
      this.validate();
  });

  }

}
