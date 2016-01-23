var clone = require('clone');

module.exports = {
  data: function() {
  return {
    messages:{},
    shouldShow:true,
    dirty:false,
    initialValue:clone(this.value),
    hadErrors:false,
    errors:[]
  }
 }
}
