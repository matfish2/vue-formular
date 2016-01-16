module.exports = function() {

  return this.options.layout=='form-horizontal'?'col-sm-' + this.options.labelWidth:'';
}
