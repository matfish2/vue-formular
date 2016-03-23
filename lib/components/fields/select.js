var render_template = require('../../helpers/render-template');
var props = require('../mixins/props');
var data = require('../mixins/data');
var methods = require('../mixins/methods');
var computed = require('../mixins/computed');
var ready = require('../mixins/ready');
var merge = require('merge');

module.exports = {
  template:render_template('form-group',{
    field:render_template('select'),
    fieldType:'Select'
  }),
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
          $(this.$el).find("select").select2('val','');
      }.bind(this)); 
    }

    if ((typeof this.select2!='undefined' || this.ajaxUrl) && typeof $!='undefined') {

      var options = {
        placeholder:this.placeholder
      };

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

      $(this.$el).find("select")
      .select2(options)
      .on("change",function(e){

        value = $(this).val();

        if (!value && that.multiple)
          value = [];

        that.value = value;
      });
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
    filteringField:null      
    }
  },
  mixins:[props,data, methods, computed,ready],
  methods: {
    passesFilter:function(item) {
      if (!this.filterBy || !this.filterValue) 
        return true;
     
      return (item[this.filterBy]==this.filterValue);

    }
  }
}

