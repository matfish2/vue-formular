module.exports = function() {
  return this.options.layout=='form-horizontal'?'col-sm-' + (12-this.options.labelWidth):'';
}
