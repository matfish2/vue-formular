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

    setTimeout(function() {
      this.validate();
    }.bind(this),0);

    if (form.relatedFields.hasOwnProperty(this.name))
      this.foreignFields = form.relatedFields[this.name].map(function(name) {
      return form.getField(name);
    });

    if (form.triggeredFields.hasOwnProperty(this.name))
     this.triggeredFields = form.triggeredFields[this.name].map(function(name) {
      return form.getField(name);
    });

    this.handleTriggeredFields();

 }

setTimeout(function() {

 this.$watch('value', function(newVal, oldVal) {

  this.$dispatch('vue-formular.change::' + this.name, {value:newVal, oldValue:oldVal});
  this.$dispatch('vue-formular.change', {name:this.name, value:newVal, oldValue:oldVal});


  if (typeof this.foreignFields!='undefined') {
   this.foreignFields.forEach(function(field){
      field.validate();
    });
  }

  this.handleTriggeredFields();

  this.dirty = !isEqual(this.value,this.initialValue);
  this.pristine = false;

  if (inForm) {
    this.validate();
  }

},{deep:true});

    }.bind(this), 0);

}

}
