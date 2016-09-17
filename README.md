# Vue Formular

[![npm version](https://badge.fury.io/js/vue-formular.svg)](https://badge.fury.io/js/vue-formular) [![Build Status](https://travis-ci.org/matfish2/vue-formular.svg?branch=master)](https://travis-ci.org/matfish2/vue-formular)

Note: As of version 0.9.6 Fields no longer have to be direct children of `vf-form` and can be nested in other components as many levels deep as you want.

This vue.js package offers a comperhensive solution for HTML form management, including presentation, validation and (optional) AJAX submission.
The presentation is based on [Bootstrap's form component](http://getbootstrap.com/css/#forms).

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
    - [Fields](#fields)
    - [Validation](#validation)
    - [Methods](#methods)
    - [Form Properties](#form-properties)
    - [Events](#events)
    - [Custom Fields](#custom-fields)
- [Form Options](#form-options)

# Dependencies

* Vue.js (>=1.0)
* Bootstrap (CSS)
* vue-resource (>=0.9.0) (When submitting via AJAX)

# Installation

## Option 1 (Recommended)

Compilation requires `browserify` with `stringify` or `webpack` with `html-loader`.

    npm install vue-formular

Require the script:

    var VueFormular = require('vue-formular');

## Option 2

Import the [standalone compiled script](https://raw.githubusercontent.com/matfish2/vue-formular/master/dist/vue-formular.min.js)

# Usage

[Check out the live demo](https://jsfiddle.net/matfish2/fjurzoLj/)

## Register the component

    Vue.use(VueFormular, options);

## Create the form

For example:

    <vf-form action="process-form" method="POST" :validation="validation" :options="options">
      <vf-status-bar></vf-status-bar>
      <vf-text label="User name:" name="username" v-ref:username></vf-text>
      <vf-password label="Password:" name="password" v-ref:password></vf-password>
      <vf-submit></vf-submit>
    </vf-form>

In order to make field retrieval faster, it is highly recommended to use a `v-ref` with the same value as the `name` property.

By default the form is sent through as a normal synchronous request. Other options are (add as props to `vf-form`):

* `ajax` - Send async request. requires `vue-resource`
* `client` - Form is not sent to the server. To fetch the data listen for the `vue-formular.sent` event.

Another optional prop for the form is `triggers`. It is used to specify fields whose display depends on the values of other fields.
The syntax is similar to that of the validation rules `requiredIf` and `requiredAndShownIf`:

      {
        triggeredFieldName:'triggeringField:value1,value2'
      }

To trigger with any truthy value simply omit the values list.

## Fields

Fields can be used in a form as descendants of the form, or independently (see the `change` event).
All fields accept the following properties:

* `label` `string` `optional`
* `name` `string` `required` field's identifier
* `value` `mixed` `optional`
* `required` `boolean` `optional`
* `disabled` `boolean` `optional`

The following fields are supported:

* `vf-text` - `input[type=text]`
* `vf-number` - `input[type=number]`
* `vf-password` - `input[type=password]`
* `vf-email` - `input[type=email]`

All input fields accept an optional `lazy` prop, which signifies that the value for this field in only synced on change rather than on each key stroke (see [here](https://vuejs.org/guide/forms.html#lazy)).

* `vf-textarea` - long text

  * `tinymce` `object\boolean` `optional` Use tinymce editor (>=4.0). Accepts options for tinymce, or nothing.

All of the above accept optional `placeholder` prop.
All of the above have a [debounce](https://vuejs.org/guide/forms.html#debounce) prop, which defaults to 300ms.
Numeric and email fields will be validated accordingly.

* `vf-date` - Datepicker (single or range).

   uses [daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker).
   the `value` should be passed as a string, matching the 'YYYY-MM-DD HH:mm:ss' format, or as a moment object. The date will be sent to the server using `moment`'s [format](http://momentjs.com/docs/#/displaying/format/) method (ISO 8601)

   * `range` `boolean` `optional` pick a range of dates. the `value` prop should be passed as an object with `start` and `end` properties. A similar object is sent to the server
   * `format` `string` `optional` Date presentation (using `moment`). Default: 'DD/MM/YYYY'.
   * `options` `object` `optional` Plugin options. Merged with the form-level option `dateOptions`.
   * `clearLabel` `string` `optional` Label for clearing current date. Default: 'Clear'
   * `no-input` `boolean` `optional` Use a `span` element rather than an `input`

* `vf-select` - select list

  * `select2` `boolean` `optional` Use select2 (4.0.0 **Only**)
  * `options` `object` `optional` Select2 options
  * `html` `boolean` By default items are passed directly to the select2 constructor, which is tasked with rendering the actual html. Use this option to render the items directly in the template. (see `filter-by` note for a case this might be useful)
  * `container-class` `string` `optional` When using select2, use this to set a class for the container and the dropdown. The class will be preceded by the entity (e.g `modal` would generate `dropdown-modal` and `container-modal`)
  * `multiple` `boolean` `optional`
  * `items` `array of objects` `optional` - item format: `{id:1, text:'Option A'}`. Defaults to an empty array.
  When using remote options fetching (`ajax-url`) pass to this option any initially selected values.
  * `placeholder` `string` Default option text (value will be an empty string). Default: 'Select Option'. Displayed only for a single select, which is not a select2.
  * `no-default` `boolean` `optional` Don't display the default option
  * `ajax-url` `string` `optional` Fetch options from remote server using this url.
  * `callback` `function` `optional` When using `ajax-url` this can be used to process the raw server output before it is passed to presentation.
  * `filter-by` `string` `optional` Dynamically filter list options by another select field.
  Recieves the name of the other field. The list items should each have a key with the same name, whose value will be compared against the filtering field's value. When the filtering field has no value all items are presented.
  When the list is fetched remotely the filtering field value is sent as a request parameter
  Note: Due to issues with dynamically updating data passed to select2 on v4.0.0 (https://github.com/select2/select2/issues/2830), This option will currently work on a `select2` with local data only when the `html` prop is set to `true`.

* `vf-checkbox` - a single boolean checkbox

   * `checked` `boolean` use this instead of `value`

* `vf-buttons-list` - list of radio\checkbox buttons

    * `multiple` `boolean` `optional`
    * `items` same as in `vf-select`
    * `filter-by` same as in `vf-select`
    * `toggle-texts` Texts to use for the toggle control, which allows for selecting/unselecting all items when `multiple` is set to `true`. Default: `{select:'Select All', unselect:'Unselect All'}`. When the field is embedded in a form it is better to use the `texts` option of the form instead.

* `vf-file` -
  * `ajax` `boolean` `optional` - use [JQuery File Upload](https://github.com/blueimp/jQuery-File-Upload). File rules will be sent as a stringified `rules` key.
  * `options` `object` `optional` - plugin options for this field. merged with the `fileOptions` form-level option.
  * `dest` `optional` `string` Upload destination to be sent along with the request. Default:'/'
  * `valueKey` the key in the response, containing the value to be set (i.e the file name). Defaults to `value`
  * `done` `function` `optional` called when the upload is finished successfully. Defaults to getting and setting the value of the field according to the `valueKey` prop.
  * `error` `function` `optional` called when an error as occured. To trigger this method throw an exception on the server-side. Default (uses `bootbox`):

        function(e, data) {
              bootbox.alert(e.responseJSON.error.message);
        }

* `vf-submit` - Submit button. Will be disabled when the form is in pristine state if `sendOnlyDirtyFields` is set to `true`

  * `text` `string` `optional` Button text. Default: 'Submit'

Note: All fields share a `fieldType` property which can be programatically used to determine the type of the component.

### Slots

All fields have `beforeField` and `afterField` [slots](http://vuejs.org/guide/components.html#Named_Slots), which allow you to add custom HTML.

## Validation

There are two ways to pass rules:

a. Through the form's `validation` prop.
b. Through the `rules` prop of each individual field.

Rules which depend on other fields (i.e `requiredIf`,`greaterThan` and `smallerThan`) should be passed using option `a`.

 Option `a` example:

       {
            rules: {
                username: {
                    required:true,
                    min: 6
                },
                password: {
                    required:true
                }
            },
            messages:{
                username: {
                    required:"custom message for :field"
                }
            }
        }

The optional `messages` property overides the default messages object for a specific field.

Option `b` example:

    <vf-text label="Username:" name="username" :rules="{required:true, min:6}"></vf-text>

The `required` rule can also be passed as a prop. E.g:

    <vf-text label="Username:" name="username" required></vf-text>

Supported rules:

* `required` `boolean` required fields will be given a unique class you can use to mark the field as required. E.g:

        .VF-Field--required label {
          position: relative;
        }

        .VF-Field--required>label:before {
          content:"*";
          font-size: 20px;
          color:red;
          position: absolute;
          left:-15px;
        }

* `requiredIf` `string` - make the field required only if another field was filled with a value (typically a select or checkbox).
The field would only display when required. To set specific values for requiring the field use the following format: `otherField:val1, val2`
* `requiredAndShownIf` `string` - same as `requiredIf`, excecpt that the field also is hidden when it is not required.
* `email` `boolean` - Automatically set to `true` for `vf-email`
* `number` `boolean` - Automatically set to `true` for `vf-number`
* `min`,`max`,`between` `number` -
 a. If the `number` or `integer` rules are set to `true` validates numeric values
 b. If the parameter is a `moment` object or a `YYYY-MM-DD`-formatted string validates dates
 c. Otherwise - validates string length
* `integer` `boolean`
* `digits` `boolean`
* `remote` `string` Validate field on the server end. Accepts a url, to which the value is sent on change event as a request parameter. Requires `vue-resource`
* `greaterThan`,`smallerThan` `string` accepts the name of the compared field. Compares numbers and dates
* `url` `boolean`

### Custom Rules

To create your own custom rule(s) pass a `customRules` property to the form's options.
the rules are passed as a function that returns `true` if validation passes. e.g:

    customRules: {
      someRule: function(field) {
          return field.value=='something'
      }
    }

### Messages

You can set the default message for the rule, and also override other default messages, by passing a `messages` property to the options object. Defaults are:

        {
            required:'The :field field is required',
            number:'The :field field must be a number',
            integer:'The :field field must be an integer',
            digits:'The :field field must have digits only',
            email:'The :field field must be a valid email address',
            between:{
              string:'The field :field must contain between {0} and {1} characters',
              number:'The field :field must be a number between {0} and {1}',
              date:'The field :field must be a date between {0} and {1}'
            },
            min: {
              string:'The :field field must contain at least {0} characters',
              number:'The :field field must be equal to or greater than {0}',
              date:'The field :field must be a date equal to or greater than {0}'
            },
            max: {
              string:'The field :field must contain no more than {0} characters',
              number:'The field :field must be equal to or smaller than {0}',
              date:'The field :field must be a date equal to or smaller than {0}'
            },
            remote:'Remote Error',
            requiredIf:'The field :field is required',
            url:'Please enter a valid URL',
            greaterThan:'The field :field must be greater than :relatedField',
            smallerThan:'The field :field must be smaller than :relatedField'
          }

### Server-side validation (when using AJAX to send the form)

Sometimes you might want to do some extra validation on the server side, after the form is sent (i.e no client-side validation errors).
If server-side validation fails simply return some invalid code (e.g 400). The response content will be displayed in the status bar.
To display more than one error, return an array similar to this:

      [
        {
          name: 'username',
          message: 'The username field is required'
        },
        {
          name: 'password',
          message: 'The password must contain at least 6 characters'
        }
      ]

## Methods

Field methods can be called by applying a [v-ref](https://vuejs.org/api/#v-ref) to the field and fetching it from the `$refs` object.

* `setValue(value)` Programatically set a value on a field. The view will be updated accordingly.
* `focus()`

## Form Properties

The following properties belong to the form component, and can be fetched by applying a `v-ref` to `vf-form`

* `hasErrors` `boolean` Does the form contain any errors?
* `pristine` `boolean` When using `sendOnlyDirtyFields`, is the form pristine?

## Events

`vue-formular.sending` (ajax form)

Fires off when the form is being sent. A message will automatically appear in the status bar.

`vue-formular.sent` (ajax form)

Fires off after the form has been sent successfully. Sends through the form data. The status bar will show the response returned from the server, if it is a string, or else the designtaed text.

`vue-formular.invalid.client`

Fires off after form submission was prevented due to client-side errors. Sends through the errors

`vue-formular.invalid.server` (ajax form)

Fires off after the form returned an invalid response from the server. Sends through the response

`vue-formular.change::field_name`

Fires off whenever a field's value is changed. Send through the name of the field, as well as new and old values.
This allows for using fields independently of the form.

`vue-formular.change`

Global change event. Sends through the name of the changed field, in addition to the old and new values

`vue-formular.clicked-error`

Fires off when the user clicked one of the error links in the statusbar.
Sends through the clicked field name.

## Custom Fields

Here is how you can go about creating new types of fields.
Let's create a time range picker.

Start by creating a `timerange.html` HTML template:

    <div class="timerangepicker">

      <div class="time-select">
        <label for="from">From</label>
        <select name="from" v-model="from">
          <option value="Select Time"></option>
          <option v-for="time in times" value="{{time}}">{{time}}</option>
          </select>
      </div>

      <div class="time-select">
        <label for="to">To</label>
        <select name="to" v-model="to">
         <option value="Select Time"></option>
         <option v-for="time in times" value="{{time}}">{{time}}</option>
       </select>
     </div>

    </div>

Then create a `timerange.js` file:

    var merge = require('merge');
    var Field = require('vue-formular/lib/components/fields/field');

    module.exports = function() {
     return merge.recursive(Field(), {
      data:function() {
        return {
          fieldType:'timerange',
          times: getTimes(),
          from:'',
          to:''
        }
      },
      ready: function() {
        this.$set('rules.timerange', true);
      },
      computed: {
        value: function() {
          if (!this.from || !this.to) return '';
          return this.from + '-' + this.to;
        }
      }
    });

    }

    function getTimes() {
      var times = [];
        for (var i=0; i<24; i++) {
          for (var j=0; j<60; j = j+30) {
            times.push(('0' + i).slice(-2) + ":" + ('0' + j).slice(-2));
          }
        }

        return times;
    }

Note that we extend the main abstract field component, and name the `fieldType` property with the same name as the partial we are about to register.
Now, let's add the `timerange` rule to prevent an invalid range:

     customRules: {
            timerange: function(field) {
              if (!field.value) return true;

              var pieces = field.value.split('-');
              pieces = pieces.map(function(piece) {
                return parseInt(piece.replace(':',''));
              });
              return pieces[1]>pieces[0];
            }
          }

Lastly, register the component and the partial:

    Vue.component('vf-timerange', require('./timerange')());
    Vue.partial('timerange', require('./timerange.html'));

Note: if you are sending the form using a normal request (i.e not ajax or client-only), you need to add a hidden field to the template which will recieve the value.
You can find an example in the date component (`date.html`)

## Form Options

Options are set in three layers, where the more particular overrides the more general.

1. Pre-defined defaults.
2. User-defined defaults for the global Vue Instance. Passed as the second paramter to the `Use` statement.
3. Options for a single form, passed through the `options` prop.

* `beforeSubmit` `function` This callback allows you to defer submission or prevent it altogether depending on the result of the callback. The callback MUST return a promise object - native or JQuery's Deffered. If and when the promise is resolved the form will be submitted. If it is rejected, the form will not be submitted.
* `layout` `string` Bootstrap's form layout class. Defaults to a vertical block display. other options are `form-horizontal` and `form-inline`
When using a layout other than `form-horizontal` adjust the `top` rule of the `form-control-feedback` class to get the feedback icon aligned with the field.
* `labelWidth` `number` relevant only for horizontal layout. The number of grid columns allocated for the label. Defaults to `3`.
* `showClientErrorsInStatusBar` `boolean` Show client errors in the status bar, with links to the relevant fields, in addition to the error shown under each field. Useful for long forms. Deault: `false`
* `additionalPayload` `object` Custom data you want to send along with the form. Serves a similar purpose to that of a hidden input field
* `sendOnlyDirtyFields` `boolean` when using AJAX form send only the dirty fields. Default: `false`
* `select2Options` `object` - Global options for [select2](https://github.com/blueimp/jQuery-File-Upload), to be used on 'vf-select' with a 'select2'  or 'ajax-url' prop
* `tinymceOptions` `object` - Global options for [tinymce](https://www.tinymce.com). To be used on a `vf-textarea` field with a `tinymce` prop.
* `fileOptions` `object` - Global options for [JQuery File Upload](https://github.com/blueimp/jQuery-File-Upload), to be used on `vf-file` with an `ajax` prop.
* `dateOptions` `object` - Global options for [daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker), to be used on `vf-date`.
* `successTimeout` `number` - Time in ms before hiding the success message after the form was sent using AJAX. Default: 4000
* `customRules` `object` See [above](#custom-rules)
* `messages` `object` see [above](#messages)
* `texts` `object` Default:

        {
          sending:'Sending Form...',
          sent:'Form was successfully sent', // this will be presented in case a string is not returned from the server
          singleError:'an error was found:', // status bar errors list title
          errors:'{0} errors were found:',
          // texts for toggling checkbox list values:
          selectAll:'Select All',
          unselectAll:'Unselect All'
        }

