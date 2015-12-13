var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');



 function range(start, count, addZero) {
        return Array.apply(0, Array(count))
                    .map(function (element, index) {
                             return addZero?('0' + String(index + start)).slice(-2):index+start;
                         });
    }




module.exports = {
  template:render_template('form-group',{
    field:render_template('date'),
    fieldType:'Date'
  }),
  watch: {
    day:require('../../watchers/date'),
    month:require('../../watchers/date'),
    year:require('../../watchers/date')
  },
    data:function() {
    return {
      day:'',
      month:'',
      year:'',
      days:range(1,31,true),
      months:range(1,12,true),
      years:this.getYears()
    }
  },
  methods: {
    getYears: function() {
     return range(1900,200);
    }
  },
  mixins:[props,data, methods, computed, ready],
}

