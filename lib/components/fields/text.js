var merge = require('merge');
var Input = require('./input');
var maxCounter = require('../mixins/max-counter');

module.exports = function() {
 return merge.recursive(Input(), {
  props:{
  	counter:{
  		type:Boolean
  	}
  },
  data:function() {
    return {
      fieldType:'text'
    }
  },
  computed:maxCounter
});

}
