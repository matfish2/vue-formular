var merge = require('merge');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(),{
    data: function() {
      return {
        fieldType:'buttons',
      }
    },
    props: {
      items: {
        type:Array,
        required:true
      },
      multiple:{
        type: Boolean,
        required:false,
        default:false
      },
      value: {
        required:false,
        default:function() {
          return [];
        }
      }
    },
    computed: {
      type: function() {
        return this.multiple?"checkbox":"radio";
      },
      arraySymbol: require('../computed/array-symbol')
    }
  });
}

