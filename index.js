String.prototype.ucfirst = require('./lib/helpers/ucfirst');
var merge = require('deepmerge');

exports.install = function(Vue, globalOptions) {

Vue.use(require('vue-resource'));

  var vfForm = {

    template: require('./lib/templates/form.html'),
    props: {
      action: {
        type: String,
        required: true
      },
      method: {
        type: String,
        required:false,
        default: 'POST'
      },
      validation: {
        type: Object,
        required:false
      },
      options:{
        type: Object,
        required:false,
        default: function() {
          return {
        }
        }
      }
    },

    created: function() {

      if (!this.validation || !this.validation.rules)
        return;

      for (var field in this.validation.rules) {
        for (var rule in this.validation.rules[field]) {

          if (['requiredIf','smallerThan','greaterThan'].indexOf(rule)>-1) {
            field = field.split(":")[0];
            var foreignField = this.validation.rules[field][rule].split(":")[0];
            this.relatedFields[foreignField] = field;
          }
        }
      }

    },
    ready: function() {

      globalOptions = globalOptions?globalOptions:{};

      var defaultOptions = require('./lib/options/options')();
      var options = merge(defaultOptions, globalOptions);
      this.options = merge(options, this.options);


    },
    data: function() {
      return {
        errors:[],
        serverErrors:[],
        relatedFields:{},
        status:'danger',
        statusbarMessage:''
      }
    },
    computed: {
        labelClass:require('./lib/computed/label-class'),
        fieldClass:require('./lib/computed/field-class')
    },
    methods: {
      submit:require('./lib/methods/submit'),
      formData:require('./lib/methods/form-data'),
      getField:require('./lib/methods/get-field'),
      showAllErrors:require('./lib/methods/show-all-errors')
}

}

Vue.component('vf-form',vfForm);

Vue.component('vf-text',require('./lib/components/fields/input')("input",{type:"text"}));
Vue.component('vf-email',require('./lib/components/fields/input')("input",{type:"email"}));
Vue.component('vf-number',require('./lib/components/fields/input')("input",{type:"number"}));
Vue.component('vf-password',require('./lib/components/fields/input')("input",{type:"password"}));
Vue.component('vf-file',require('./lib/components/fields/file'));
Vue.component('vf-textarea',require('./lib/components/fields/textarea'));
Vue.component('vf-select',require('./lib/components/fields/select'));
Vue.component('vf-buttons-list',require('./lib/components/fields/buttons-list'));
Vue.component('vf-date',require('./lib/components/fields/date'));
Vue.component('vf-checkbox',require('./lib/components/fields/checkbox'));

Vue.component('vf-status-bar', require('./lib/components/status-bar'));
Vue.component('vf-submit',require('./lib/components/submit'));

}


