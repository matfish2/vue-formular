module.exports = function(rule) {
  var that = this;

  if (this.fieldType==='date') {
   var format = this.format.split(' ')[0]; 
  }

  var messages = this.getForm().options.messages;

  var message = this.messages[rule]?
  this.messages[rule]:
  messages[rule];

  if (typeof message=='object') {
    message = extractMessage(rule, message, this);
  }

  var params = this.rules[rule];

  if (isMomentObject(params)) {
   message = message.replace("{0}", params.format(format));
 }
 else if (Array.isArray(params)) {
  params.forEach(function(param, index) {
    message = message.replace("{" + index + "}", !isMomentObject(param)?param:param.format(format));
  }.bind(this));
}
else if (typeof params=='number' || typeof params=='string') {
 message = message.replace("{0}", params);
 if (typeof params=='string') {
  var relatedFields = params.split(',');
  var replacement = [];
  relatedFields.forEach(function(field) {
    var relatedField  = that.getField(field);
    if (relatedField) replacement.push(stripLabel(relatedField.label));
  });
  if (replacement.length)
   message = message.replace(":relatedField", replacement.join(", "));
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

function isMomentObject(param) {
  return typeof param.isValid!='undefined';
}

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
