var render_template = require('../../helpers/render-template');
var merge = require('merge');
var convertDateRulesToMoment = require('../helpers/convert-date-rules-to-moment');

var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');

module.exports = {
  template:render_template('form-group',{
    field:render_template('date'),
    fieldType:'Date'
  }),
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Select Date'
    },
    format: {
      type: String,
      required: false,
      default: 'DD/MM/YYYY'
    },
    range: {
      type: Boolean,
      required: false,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default: function() {
        return {}
      }
    }
  },
  created: function() {

      this.rules = convertDateRulesToMoment(this.rules);

        this.$watch('rules',function() {
      this.rules = convertDateRulesToMoment(this.rules);
    }, {deep:true});

  },
  ready: function() {

      if (this.value && (typeof this.value=='string' || (this.value.hasOwnProperty('start') && typeof this.value.start=='string'))) {

        this.value = this.range?{start:moment(this.value.start, 'YYYY-MM-DD'),end:moment(this.value.end, 'YYYY-MM-DD')}:moment(this.value, 'YYYY-MM-DD');

      }

      if (this.value) {
        var value = {startDate:this.range?this.value.start.format(this.format):this.value.format(this.format)};
        if (this.range) value.endDate = this.value.end.format(this.format);
        this.options = merge.recursive(this.options, value);
      }

  this.options = merge.recursive(this.$parent.options.dateOptions, this.options);

    var options = merge.recursive(this.options, {
        singleDatePicker: !this.range,
        showDropdowns: true,
         locale: {
          format: this.format
      }
    });

       $(this.$el).find(".VF-Field--Date__datepicker").daterangepicker(options,
    function(start, end) {
        this.value = this.range?{start:start, end:end}:start;
    }.bind(this));
  },
    data:function() {
    return {

    }
  },
  computed: {
    formattedDate: function() {
      if (!this.value ||
        (!this.range && !this.value.format) ||
        (this.range && (!this.value.start.format || !this.value.end.format)))
        return this.placeholder;

      if (!this.range) return this.value.format(this.format);

      return this.value.start.format(this.format) + " - " + this.value.end.format(this.format);

    },
    serverFormat: function() {
      if (!this.value) return '';

      if (!this.range) return this.value.format();

      return JSON.stringify({start:this.value.start.format(),
              end:this.value.end.format()
              });
    }
  },
  mixins:[props,data, methods, computed, ready],
}



