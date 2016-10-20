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
        type:Boolean
      },
      options: {
        type:Object,
        default: function() {
          return {}
        }
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
      html: {
        type:Boolean
      }
    },
    ready: function() {

      var that = this;
      var value;
      var callback = this.callback;
      var filterBy = this.filterBy;

      if (this.filterBy) {
        this.html = true;
        this.filteringField = this.getField(this.filterBy);

        this.$watch('filterValue', function(val) {
          if (val) {
           this.setValue('');
         }
       }.bind(this));
      }

      if ((this.select2 || this.ajaxUrl) && typeof $!='undefined') {

        var options = this.inForm()?clone(this.getForm().options.select2Options):{};

        options = merge.recursive(options, {
          placeholder:this.placeholder
        });

        if (!this.html)
          options.data = this.items;

        if (this.ajaxUrl) {
          options = merge.recursive(options, {
            ajax: {
              url: this.ajaxUrl,
              dataType: 'json',
              delay: 250,
              data: function (params) {
                var query = {
                  q: params.term,
                  selected: that.value
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

        options = merge.recursive(options, this.options);

        this.el = $(this.$el).find("select");

        this.el.select2(options)
        .on("select2:select",function(e){
          that.value = $(this).select2('val');
        }).on("select2:unselecting", function(e) {
         if (that.multiple) {
          var $this = $(this);
          setTimeout(function() {
            value = $this.select2('val');
            that.value = value?value:[];
          }, 0);
        } else {
          that.value = '';
        }
      });

        this.el.select2('val',this.value);

        setTimeout(function() {
          this.el.trigger('change');
        }.bind(this),0);

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
      },
       filteredItems: function() {
       
       if (this.select2 && !this.ajaxUrl && !this.html) 
        return [];
        
        if (!this.filterBy) return this.items;

        if (this.select2)
        setTimeout(function() {
          $(this.$el).find("select").val(this.value).trigger("change");
        }.bind(this), 0);

        return this.items.filter(function(item) {
          return this.passesFilter(item);
        }.bind(this))
      }
    },
    data: function(){
      return {
        filteringField:null,
        fieldType:'select',
        tagName:'select'
      }
    },
    methods: {
      setValue: function(value) {
        this.value = value;
        this.dirty = true;

        if (this.select2)
          this.el.select2('val',value);
      },
      reset: function() {
        var value = this.multiple?[]:'';
        this.wasReset = true;
        this.value = value;

        if (this.select2)
          this.el.select2('val', value);

      },
      passesFilter:function(item) {
        if (!this.filterBy || !this.filterValue)
          return true;

        return (item[this.filterBy]==this.filterValue);

      }
    }
  });
}

