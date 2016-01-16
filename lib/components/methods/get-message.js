module.exports = function(rule) {

  var messages = this.$parent.options.messages;

    var message = this.messages[rule]?
    this.messages[rule]:
    messages[rule];


    if (['min','max','between'].indexOf(rule)>-1) {
      message = this.rules.number || this.rules.integer?message.number:message.string;
    }

    var params = this.rules[rule];
    if (typeof params=='object') {
    params.forEach(function(param, index) {
        message = message.replace("{" + index + "}", param);
    });
}
  else if (typeof params=='number' || typeof params=='string') {
       message = message.replace("{0}", params);
       if (typeof params=='string')
       message = message.replace(":relatedField", this.$parent.getField(params).label);
  }

    message = message.replace(":field", this.label?this.label:this.name);

    return message;
  }
