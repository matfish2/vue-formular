var merge = require('merge');

module.exports = {
  data: function() {
  return {
    messages:{},
    shouldShow:true,
    dirty:false,
    initialValue:typeof this.value=='object'?merge(this.value,{}):this.value,
    hadErrors:false,
    errors:[]
  }
 }
}
