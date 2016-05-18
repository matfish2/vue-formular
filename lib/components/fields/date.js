var render_template = require('../../helpers/render-template');
var merge = require('merge');
var clone = require('clone');
var convertDateRulesToMoment = require('../../helpers/convert-date-rules-to-moment');

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
    },
    clearLabel:{
      type: String,
      required: false,
      default:'Clear'
    }
  },
  created: function() {

    this.fieldType = 'date';

    this.rules = convertDateRulesToMoment(this.rules);

    this.$watch('rules',function() {
      this.rules = convertDateRulesToMoment(this.rules);
    }, {deep:true});

  },
  ready: function() {

    var parentOptions = this.inForm()?clone(this.$parent.options.dateOptions):{};

    if (this.value && (typeof this.value=='string' || (this.value.hasOwnProperty('start') && typeof this.value.start=='string'))) {

      this.value = this.range?
      {start:moment(this.value.start, 'YYYY-MM-DD HH:mm:ss'),end:moment(this.value.end, 'YYYY-MM-DD HH:mm:ss')}:
      moment(this.value, 'YYYY-MM-DD HH:mm:ss');

    }

    if (this.value) {
      var value = {startDate:this.range?this.value.start.format(this.format):this.value.format(this.format)};
      if (this.range) value.endDate = this.value.end.format(this.format);
      this.options = merge.recursive(this.options, value);
    }

    if (this.disabled) return;

    this.options = merge.recursive(parentOptions, this.options);

    var options = merge.recursive(this.options, {
      singleDatePicker: !this.range,
      showDropdowns: true,
      locale: {
        format: this.format,
        cancelLable: this.clearLabel
      }
    });

    var picker = $(this.$el).find(".VF-Field--Date__datepicker"); 

    picker.daterangepicker(options,
      function(start, end) {
        this.value = this.range?{start:start, end:end}:start;
      }.bind(this));

    picker.on('cancel.daterangepicker', function(ev, picker) {
      this.value = this.range?{start:null, end:null}:null;
    }.bind(this));
    
    if (!this.range) {

      datepicker.on('show.daterangepicker', function(ev, picker) {

       var el = $(picker.container[0]);
       el.find(".ranges").css("display","block !important");
       el.find(".applyBtn").hide();

     }.bind(this));     

    }
    
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



