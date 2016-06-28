var merge = require('merge');
var clone = require('clone');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(),{
    props: {
      items: {
        type:Array,
        required:false,
        default:function() {
          return [];
        }
      },
      multiple:{
        type: Boolean,
        required:false,
        default:false
      },
      select2: {
        required: false
      },
      containerClass: {
        required:false
      },
      placeholder: {
        type:String,
        required:false,
        default:'Select Option'
      },
      noDefault: {
        type: Boolean
      },
      filterBy: {
        type: String,
        default: ''
      },
      ajaxUrl: {
        type: String,
        default:''
      },
      callback: {
        type: Function,
        required: false
      },
      selected: {
        type: Array,
        require:false,
        default: false
      }
    },
    created: function() {
      this.fieldType = 'select';
    },
    ready: function() {
      var that = this;
      var value;
      var callback = this.callback;
      var filterBy = this.filterBy;

      if (this.filterBy) {
        this.filteringField = this.$parent.getField(this.filterBy);

        this.$watch('filterValue', function(val) {
          if (val)
            this.el.select2('val','');
        }.bind(this));
      }

      if ((typeof this.select2!='undefined' || this.ajaxUrl) && typeof $!='undefined') {

        var options = this.inForm()?clone(this.$parent.options.select2Options):{};

        options = merge.recursive(options, {
          placeholder:this.placeholder
        });

        if (this.ajaxUrl) {
          options = merge.recursive(options, {
            ajax: {
              url: this.ajaxUrl,
              dataType: 'json',
              delay: 250,
              data: function (params) {
                var query = {
                  q: params.term
                };

                if (filterBy) {
                  var filterValue = $("[name=" + filterBy + "]").val();

                  if (filterValue)
                    query[filterBy] = filterValue;
                }

                return query;
              },
              processResults: function (data) {

                return {
                  results: callback?$.map(data, callback):data
                }
              },
              cache: true
            },
            minimumInputLength: 3
          });

        }

        if (typeof this.select2=='object')
          options = merge.recursive(options, this.select2);

        this.el = $(this.$el).find("select");

        this.el.select2(options)
        .on("select2:select",function(e){

          value = $(this).select2('val');

          if (!value && that.multiple)
            value = [];

          that.value = value;
        });

        if (this.containerClass) {
          this.el.data('select2').$container.addClass("container-" + this.containerClass);
          this.el.data('select2').$dropdown.addClass("dropdown-" + this.containerClass);
        }

      }

    },
    computed: {
      arraySymbol: require('../computed/array-symbol'),
      filterValue: function() {
        return this.filteringField?this.filteringField.value:null;
      }
    },
    data: function(){
      return {
        filteringField:null,
        fieldType:'select',
      }
    },
    methods: {
      setValue: function(value) {
        this.value = value;
        this.el.select2('val',value);
      },
      passesFilter:function(item) {
        if (!this.filterBy || !this.filterValue)
          return true;

        return (item[this.filterBy]==this.filterValue);

      }
    }
  });
}

