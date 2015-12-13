module.exports = function() {
  return this.options.styling=='form-horizontal'?'col-sm-' + (12-this.options.labelWidth):'';
}
