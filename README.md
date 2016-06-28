# Vue Formular

[![npm version](https://badge.fury.io/js/vue-formular.svg)](https://badge.fury.io/js/vue-formular) [![Build Status](https://travis-ci.org/matfish2/vue-formular.svg?branch=master)](https://travis-ci.org/matfish2/vue-formular)

This vue.js package offers a comperhensive solution for HTML form management, including presentation, validation and (optional) AJAX submission.
The presentation is based on [Bootstrap's form component](http://getbootstrap.com/css/#forms).

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
    - [Fields](#fields)
    - [Validation](#validation)
    - [Events](#events)
- [Form Options](#form-options)

# Dependencies

* Vue.js (>=1.0)
* Bootstrap (CSS)
* vue-resource (When submitting via AJAX)

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
      <vf-text label="User name:" name="username"></vf-text>
      <vf-password label="Password:" name="password"></vf-password>
      <vf-submit></vf-submit>
    </vf-form>

By default the form is sent through as a normal synchronous request. Other options are (add as props to `vf-form`):

* `ajax` - Send async request. requires `vue-resource`
* `client` - Form is not sent to the server. To fetch the data listen for the `vue-formular.sent` event.

## Fields

Fields can be used in a form as direct vue children of the form, or independently (see the `change` event).
All fields accept the following properties:

* `label` `string` `optional`
* `name` `string` `required` field's identifier
* `value` `mixed` `optional`
* `disabled` `boolean` `optional`

The following fields are supported:

* `vf-text` - `input[type=text]`
* `vf-number` - `input[type=number]`
* `vf-password` - `input[type=password]`
* `vf-email` - `input[type=email]`
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

* `vf-select` - select list

  * `select2` `object\boolean` `optional` Use select2 (>=4.0). Accepts options for select2, or nothing
  * `container-class` `string` `optional` When using select2, use this to set a class for the container and the dropdown. The class will be preceded by the entity (e.g `modal` would generate `dropdown-modal` and `container-modal`)
  * `multiple` `boolean` `optional`
  * `items` `array of objects` `optional` - item format: `{value:1, text:'Option A'}`. Defaults to an empty array
  * `placeholder` `string` Default option text (value will be an empty string). Default: 'Select Option'. Displayed only for a single select, which is not a select2.
  * `no-default` `boolean` `optional` Don't display the default option
  * `ajax-url` `string` `optional` Fetch options from remote server using this url.
  * `selected` `array of objects` `optional` when using ajax, use this option to pre-populate the list with selected value(s). Syntax is the same as `items`
  * `callback` `function` `optional` When using `ajax-url` this can be used to process the raw server output before it is passed to presentation.
  * `filter-by` `string` `optional` Dynamically filter list options by another select field.
  Recieves the name of the other field. The list items should each have a key with the same name, whose value will be compared against the filtering field's value. When the filtering field has no value all items are presented.
  When the list is fetched remotely the filtering field value is sent as a request parameter

* `vf-checkbox` - a single boolean checkbox

   * `checked` `boolean` use this instead of `value`

* `vf-buttons-list` - list of radio\checkbox buttons

    * `multiple` `boolean` `optional`
    * `items` same as in `vf-select`

* `vf-file` -
  * `ajax` `boolean` `optional` - use [JQuery File Upload](https://github.com/blueimp/jQuery-File-Upload). File rules will be sent as a stringified `rules` key.
  * `options` `object` `optional` - plugin options for this field. merged with the `fileOptions` form-level option.

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

Fires off whenever a field's value is changed. Send through the new and old values.
This allows for using fields independently of the form.

`vue-formular.change`

Global change event. Sends through the name of the changed field, in addition to the old and new values

`vue-formular.clicked-error`

Fires off when the user clicked one of the error links in the statusbar.
Sends through the clicked field name.

## Form Options

Options are set in three layers, where the more particular overrides the more general.

1. Pre-defined defaults.
2. User-defined defaults for the global Vue Instance. Passed as the second paramter to the `Use` statement.
3. Options for a single form, passed through the `options` prop.

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
          errors:'{0} errors were found:'
        }

