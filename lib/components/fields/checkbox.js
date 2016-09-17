var merge = require('merge');
var Field = require('./field');

module.exports = function() {
  return merge.recursive(Field(), {
    props: {
      checked: {
        type: Boolean,
        default:undefined
      }
    },
    ready: function() {
      if (typeof this.checked=='undefined') {
        this.value = false;
        this.dirty = true;
      }
    },
    computed: {
      value: {
        get:function() {
          return this.checked;
        },
        set:function(val) {
          this.checked= val!=0;
        }
      }
    },
    methods: {
      reset: function() {
        this.checked = undefined;
        this.dirty = false;
      }
    },
    data: function() {
      return {
        initialValue: this.checked,
        fieldType:'checkbox',
      }
    }
});
}

