module.exports = function(rule) {

  var messages = this.$parent.options.messages;

    var message = this.messages[rule]?
    this.messages[rule]:
    messages[rule];

    if (typeof message=='object') {
      message = extractMessage(rule, message, this);
    }

    var params = this.rules[rule];

    if (typeof params.isValid!='undefined') {
       message = message.replace("{0}", params.format(this.format));
    }
    else if (typeof params=='object') {
    params.forEach(function(param, index) {
        message = message.replace("{" + index + "}", typeof param.isValid=='undefined'?param:param.format(this.format));
    }.bind(this));
  }
  else if (typeof params=='number' || typeof params=='string') {
       message = message.replace("{0}", params);
       if (typeof params=='string') {
        var relatedField  = this.$parent.getField(params);
      if (relatedField)
       message = message.replace(":relatedField", stripLabel(relatedField.label));
       }
  }

    message = message.replace(":field", this.label?stripLabel(this.label):this.name);

    return message;
  }


  function extractMessage(rule, message, field) {

    if (field.rules.number || field.rules.integer)
      return message.number;

        if (rule=='between' && typeof field.rules[rule][0]=='object' ||
        ['min','max'].indexOf(rule)>-1 && typeof field.rules[rule]=='object')
      return message.date;

    return message.string;
  }


function stripLabel(label) {
    return label.replace(/<(?:.|\n)*?>/gm, '');
}
