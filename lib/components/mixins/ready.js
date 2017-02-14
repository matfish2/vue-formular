var isEqual = require('../../helpers/is-equal');

module.exports = {
  ready: function() {

    if (this.required) {
      this.$set("rules.required", true);
    }

    var inForm = this.inForm();

    if (inForm) {

      if (!this.getForm().options.sendOnlyDirtyFields)
        this.getForm().fields.push(this);

      if (this.getForm().options.sendOnlyDirtyFields) {

         this.$watch('dirty', function(isDirty) {
          var method = isDirty?'push':'$remove';
          this.getForm().fields[method](this);
        });

     }

     var form = this.getForm();
     var v = this.getForm().validation;

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

  var dispatcher = inForm?form:this;

  dispatcher.dispatch('change::' + this.name, {name:this.name,
                                                       field:this, 
                                                       value:newVal, 
                                                       oldValue:oldVal});
  dispatcher.dispatch('change', {name:this.name,
                                         field:this,
                                         value:newVal,
                                         oldValue:oldVal});


  if (typeof this.foreignFields!='undefined') {
   this.foreignFields.forEach(function(field){
      field.validate();
    });
  }

  this.handleTriggeredFields();

  this.dirty = this.wasReset?false:!isEqual(this.value,this.initialValue);

  this.pristine = this.wasReset;

  this.wasReset = false;

  if (inForm) {
    this.validate();
  }

},{deep:true});

    }.bind(this), 0);

}

}
