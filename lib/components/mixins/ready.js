var isEqual = require('../../helpers/is-equal');

module.exports = {
  ready: function() {

    var inForm = this.inForm();

    if (inForm) {

      if (!this.$parent.options.sendOnlyDirtyFields)
      this.$parent.fields.push(this);

      if (this.$parent.options.sendOnlyDirtyFields) {
      this.$watch('dirty', function(isDirty) {
        var method = isDirty?'push':'$remove';
          this.$parent.fields[method](this);
      });
      }

      var form = this.$parent;
      var v = this.$parent.validation;

      if (v.rules && v.rules.hasOwnProperty(this.name))
        this.rules = v.rules[this.name];

      if (typeof v.messages!='undefined' &&  v.messages.hasOwnProperty(this.name))
        this.messages = v.messages[this.name];

      this.validate();

    if (form.relatedFields.hasOwnProperty(this.name))
       var foreignFields = form.relatedFields[this.name].map(function(name) {
          return form.getField(name);
       }); 

   }

   this.$watch('value', function(newVal, oldVal) {

    this.$dispatch('vue-formular.change::' + this.name, {value:newVal, oldValue:oldVal});

    if (typeof foreignField!='undefined') {
      foreignFields.forEach(function(field){
        field.validate();
      });
   }

   this.dirty = !isEqual(this.value,this.initialValue);
   this.pristine = false;

   if (inForm) {

    this.validate();

  }



},{deep:true});

 }

}
