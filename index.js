String.prototype.ucfirst = require('./lib/helpers/ucfirst');
var merge = require('merge');

exports.install = function(Vue, globalOptions) {

  var vfForm = {

    template: require('./lib/templates/form.html'),
    props: {
      ajax: {
        type: Boolean,
        required: false,
        default: false
      },
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

      if (!this.ajax) {
        var payload = this.options.additionalPayload;
        for (key in payload) {
          this.additionalValues.push({name:key,value:payload[key]});
        }
      }

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
    data: function() {
      return {
        isForm: true,
        fields:[],
        additionalValues:[],
        errors:[],
        serverErrors:[],
        relatedFields:{},
        status:'danger',
        statusbarMessage:''
      }
    },
    computed: {
        labelClass:require('./lib/computed/label-class'),
        fieldClass:require('./lib/computed/field-class'),
        pristine: function() {
          return this.fields.length==0;
        }
    },
    methods: {
      submit:require('./lib/methods/submit'),
      formData:require('./lib/methods/form-data'),
      getField:require('./lib/methods/get-field'),
      showAllErrors:require('./lib/methods/show-all-errors'),
      reinitForm:require('./lib/methods/reinit-form')
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


