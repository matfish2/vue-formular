String.prototype.ucfirst = require('./lib/helpers/ucfirst');
var merge = require('merge');

exports.install = function(Vue, globalOptions) {

  var vfForm = {

    template: require('./lib/templates/form.html'),
    props: {
      name:{
        type:String
      },
      client:{
        type:Boolean,
        required:false,
        default: false
      },
      ajax: {
        type: Boolean,
        required: false,
        default: false
      },
      action: {
        type: String
      },
      method: {
        type: String,
        required:false,
        default: 'POST'
      },
      validation: {
        type: Object,
        required:false,
        default: function() {
          return {
          }
        }
      },
      triggers:{
        type: Object,
        required:false,
        default: function() {
          return {
          }
        }
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

      globalOptions = globalOptions?globalOptions:{};

      var defaultOptions = require('./lib/options/options')();
      var options = merge.recursive(defaultOptions, globalOptions);
      this.options = merge.recursive(options, this.options);

      if (!this.ajax && !this.client) {
        var payload = this.options.additionalPayload;
        for (var key in payload) {
          this.additionalValues.push({name:key,value:payload[key]});
        }
      }

      this.registerInterfieldsRules();
      this.registerTriggers();

    },
    data: function() {
      return {
        isForm: true,
        fields:[],
        additionalValues:[],
        errors:[],
        serverErrors:[],
        relatedFields:{},
        triggeredFields:{},
        status:'danger',
        statusbarMessage:'',
        sending:false
      }
    },
    computed: {
      labelClass:require('./lib/computed/label-class'),
      fieldClass:require('./lib/computed/field-class'),
      hasErrors: require('./lib/computed/has-errors'),
      pristine: function() {
        return this.fields.length==0;
      }
    },
    methods: {
      submit:require('./lib/methods/submit'),
      formData:require('./lib/methods/form-data'),
      getField:require('./lib/methods/get-field'),
      showAllErrors:require('./lib/methods/show-all-errors'),
      reinitForm:require('./lib/methods/reinit-form'),
      registerInterfieldsRules: require('./lib/methods/register-interfields-rules'),
      registerTriggers: require('./lib/methods/register-triggers'),
      childrenOf: require('./lib/methods/children-of'),
      dispatch: require('./lib/methods/dispatch')
    }

  }

  Vue.component('vf-form',vfForm);

  Vue.component('vf-text',require('./lib/components/fields/text')());
  Vue.component('vf-email',require('./lib/components/fields/email')());
  Vue.component('vf-number',require('./lib/components/fields/number')());
  Vue.component('vf-password',require('./lib/components/fields/password')());
  Vue.component('vf-file',require('./lib/components/fields/file')());
  Vue.component('vf-textarea',require('./lib/components/fields/textarea')());
  Vue.component('vf-select',require('./lib/components/fields/select')());
  Vue.component('vf-buttons-list',require('./lib/components/fields/buttons-list')());
  Vue.component('vf-date',require('./lib/components/fields/date')());
  Vue.component('vf-checkbox',require('./lib/components/fields/checkbox')());

  Vue.component('vf-status-bar', require('./lib/components/status-bar'));
  Vue.component('vf-submit',require('./lib/components/submit'));

  Vue.partial('input',require('./lib/templates/input.html'));
  Vue.partial('buttons',require('./lib/templates/buttons-list.html'));
  Vue.partial('checkbox',require('./lib/templates/checkbox.html'));
  Vue.partial('date',require('./lib/templates/date.html'));
  Vue.partial('file',require('./lib/templates/file.html'));
  Vue.partial('select',require('./lib/templates/select.html'));
  Vue.partial('textarea',require('./lib/templates/textarea.html'));
  Vue.partial('date-span',require('./lib/templates/date-span.html'));
  Vue.partial('date-input',require('./lib/templates/date-input.html'));

}


