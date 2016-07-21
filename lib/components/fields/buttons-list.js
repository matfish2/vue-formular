var merge = require('merge');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(),{
    data: function() {
      return {
        fieldType:'buttons',
        filteringField:null
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
        },
      },
       filterBy: {
        type: String,
        default: ''
      }
    },
    ready: function() {
      if (this.filterBy) {
        this.filteringField = this.$parent.getField(this.filterBy);

        this.$watch('filterValue', function(val) {
          if (val) {
             this.value = this.multiple?[]:'';
          }
        }.bind(this));
      }
    },
    computed: {
      type: function() {
        return this.multiple?"checkbox":"radio";
      },
      filterValue: function() {
        return this.filteringField?this.filteringField.value:null;
      },
      arraySymbol: require('../computed/array-symbol')
    },
    methods: {
       passesFilter:function(item) {
        if (!this.filterBy || !this.filterValue)
          return true;

        return (item[this.filterBy]==this.filterValue);

      }
    }
  });
}

