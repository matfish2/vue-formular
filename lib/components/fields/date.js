var merge = require('merge');
var Field = require('./field');
var clone = require('clone');
var convertDateRulesToMoment = require('../../helpers/convert-date-rules-to-moment');

module.exports = function() {
  return merge.recursive(Field(), {
    data: function() {
      return {
        fieldType:'date',
      }
    },
    props: {
      placeholder: {
        type: String,
        required: false,
        default: 'Select Date'
      },
      noInput: {
        type: Boolean,
        default:false
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

      this.rules = convertDateRulesToMoment(this.rules);

      this.$watch('rules',function() {
        this.rules = convertDateRulesToMoment(this.rules);
      }, {deep:true});

    },
    ready: function() {

      var dateRule = this.range?'daterange':'date';

      this.$set('rules.' + dateRule, true);

      var parentOptions = this.inForm()?clone(this.$parent.options.dateOptions):{};

      if (this.value) {

        this.momentizeValue();

        var value = {startDate:this.range?this.value.start.format(this.format):this.value.format(this.format)};
        if (this.range) value.endDate = this.value.end.format(this.format);
        this.options = merge.recursive(this.options, value);
      }

      if (this.disabled) return;

      this.options = merge.recursive(parentOptions, this.options);

      var options = merge.recursive(this.options, {
        singleDatePicker: !this.range,
        locale: {
          format: this.format,
          cancelLabel: this.clearLabel
        }
      });

      this.datepicker = $(this.$el).find(".VF-Field--Date__datepicker");

      this.datepicker.daterangepicker(options);


      this.datepicker.on('apply.daterangepicker', function(ev, picker) {
        this.value = this.range?
        {start:picker.startDate, end:picker.endDate}:
        picker.startDate;

        this.datepicker.trigger("change");
      }.bind(this));

      this.datepicker.on('cancel.daterangepicker', function(ev, picker) {
        this.value = null;
        this.datepicker.trigger("change");
      }.bind(this));        


      if (!this.range && !this.isTimepicker) {

        this.datepicker.on('show.daterangepicker', function(ev, picker) {
         var el = $(picker.container[0]);
         el.find(".ranges").css("display","block !important");
         el.find(".applyBtn").hide();

       }.bind(this));

      }

      if (this.noInput) {
        this.$watch('value', function(newVal, oldVal) {

         if (newVal) {
          this.momentizeValue();

          var startDate = this.range?
          this.value.start.format(this.format):
          this.value.format(this.format);

          var endDate = this.range?
          this.value.end.format(this.format):
          null;

        } else {
          startDate = endDate = moment();
        }

        this.datepicker.data('daterangepicker').setStartDate(startDate);
        this.datepicker.data('daterangepicker').setEndDate(endDate);
      });

      }

    },
    methods: {
      momentizeValue: function() {
       if (isDateString(this.value))
        this.value = this.range?
      {start:moment(this.value.start, 'YYYY-MM-DD HH:mm:ss'),
      end:moment(this.value.end, 'YYYY-MM-DD HH:mm:ss')}:
      moment(this.value, 'YYYY-MM-DD HH:mm:ss');
    },
    setValue: function(val) {
      if (this.noInput) {
        this.value = val;
      } else {
        this.formattedDate = moment(val, 'YYYY-MM-DD HH:mm:ss').format(this.format);
      }
    }
  },
  computed: {
    type: function() {
      return this.noInput?'date-span':'date-input';
    },
    isTimepicker: function() {
      return this.options.hasOwnProperty('timePicker') && this.options.timePicker;
    },
    formattedDate: {
      get:function() {

        if (!this.value ||
          (!this.range && !this.value.format) ||
          (this.range &&
           ((!this.value.start || !this.value.start.format) || (!this.value.end || !this.value.end.format))))
          return this.noInput?this.placeholder:'';

        if (!this.range) return this.value.format(this.format);

        return this.value.start.format(this.format) + " - " + this.value.end.format(this.format);

      }, 
      set:function(val) {

        if (!this.range && !val) {
          this.value = '';
          this.datepicker.data('daterangepicker').setStartDate(moment().format(this.format));
        }

        if (this.range) {
          var values = val.split('-');
          this.value = {
            start: moment(values[0],this.format),
            end: moment(values[1],this.format)
          }
          this.datepicker.data('daterangepicker').setStartDate(values[0]);
          this.datepicker.data('daterangepicker').setEndDate(values[1]);
        } else {
          this.value = moment(val, this.format);          
          this.datepicker.data('daterangepicker').setStartDate(val);
          this.datepicker.data('daterangepicker').setEndDate(null);
        }

      }
    },
    serverFormat: function() {

      if (!this.value || isDateString(this.value)) return '';

      if (!this.range) return this.value.format();

      return JSON.stringify({
        start:this.value.start.format(),
        end:this.value.end.format()
      });
    }
  }
});

}


function isDateString(value) {
  return value && (typeof value=='string' || (value.hasOwnProperty('start') && typeof value.start=='string'));
}
