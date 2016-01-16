# Vue Formular

This vue.js package offers a comperhensive solution for HTML form management, including presentation and validation.
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

# Installation

    npm install vue-formular

Require the script. Compilation Requires two `browserify` transforms: `stringify` and `require-globify`:

    var VueFormular = require('vue-formular');

# Usage

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

## Fields

Fields can be used in a form as DIRECT children of the form, or independently (see the `change` event)
All fields accept the following properties:

* `label` `string` `optional`
* `name` `string` `required` field's identifier
* `value` `mixed` `optional`

The following fields are supported:

* `vf-text` - `input[type=text]`
* `vf-number` - `input[type=number]`
* `vf-password` - `input[type=password]`
* `vf-email` - `input[type=email]`
* `vf-textarea` - long text

All of the above accept an optional `placeholder` prop.
Numeric and email fields will be validated accordingly.

* `vf-date` - Datepicker (single or range).

   uses [daterangepicker](https://github.com/dangrossman/bootstrap-daterangepicker).
   the `value` should be passed as a string, matching the 'YYYY-MM-DD' format, or as a moment object. The date will be sent to the server in the following format: `2005-12-11T22:00:00.000Z`

   * `range` `boolean` `optional` pick a range of dates. the `value` prop should be passed as an object with `start` and `end` properties. A similar object is sent to the server
   * `format` `string` `optional` Date presentation (using `moment`). Default: 'DD/MM/YYYY'.

* `vf-select` - select list

  * `select2` `object\boolean` `optional` Use select2. accepts options for select2, or nothing
  * `multiple` `boolean` `optional`
  * `items` `array of objects` `required` - item format: `{value:1, text:'Option A'}`
  * `placeholder` `string` Default: 'Select Option'

* `vf-checkbox` - a single boolean checkbox

   * `checked` `boolean` use this instead of `value`

* `vf-buttons-list` - list of radio\checkbox buttons

    * `multiple` `boolean` `optional`
    * `items` same as in `vf-select`

* `vf-file` - Presentation only. For funcitonality you can use an ajax file uploader, such as [AjaxFileUpload](https://github.com/davgothic/AjaxFileUpload)
* `vf-submit` - Submit button in a row wrapper, floated to the right.

  * `text` `string` `optional` Button text. Default: 'Submit'

### Slots

All fields have `beforeField` and `afterField` [slots](http://vuejs.org/guide/components.html#Named_Slots), which allow you to add custom HTML.
`vf-submit` has similar `beforeButton` and `afterButton` slots.

## Validation

passed as an object to the form's `validation` prop.
 An example works best to illustrate the syntax:

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
* `min`,`max`,`between` `number` - when the `number` rule is set to `true` validates numeric values, otherwise vaidates string length
* `integer` `boolean`
* `digits` `boolean`
* `remote` `string` Validate field on the server end. Accepts a url, to which the value is sent on change event as a request parameter
* `greaterThan`,`smallerThan` `string` accepts the name of the compared field. Compares numbers and dates
* `url` `boolean`

### Custom Rules

To create your own custom rule(s) pass a `customRules` property to the form's options.
the rules are passed as functions that returns `true` if validation passes. e.g:

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
        },
        min: {
          string:'The :field field must contain at least {0} characters',
          number:'The :field field must be equal to or greater than {0}',
        },
        max: {
          string:'The field :field must contain no more than {0} characters',
          number:'The field :field must be equal to or smaller than {0}',
        },
        remote:'Remote Error',
        requiredIf:'The field :field is required',
        url:'Please enter a valid URL',
        greaterThan:'The field :field must be greater than :relatedField',
        smallerThan:'The field :field must be smaller than :relatedField'
      }

### Server-side validation

Sometimes you might want to do some extra validation on the server side, after the form is sent (i.e no client-side validation errors).
If server-side validation fails simply return some invalid code (e.g 400). The response will be displayed in the status bar.
If you want to display more than one error, you can return an object, consisting of `field_name:message` pairs. The messages will be displayed in a list and will each link to its corresponding field (same as client-side errors when `showErrorsInStatusbar` is set to `true`).

## Events

`vue-formular.sending`

Fires off when the form is being sent. Sends through the form data. A message will automatically appear in the status bar.

`vue-formular.sent`

Fires off after the form has been sent successfully. Sends through the form data. The status bar will show the response returned from the server, if it is a string, or else the designtaed text.

`vue-formular.invalid`

Fires off after the form returned an invalid response from the server. Sends through the response content

`vue-formular.change::field_name`

Fires off whenever a field's value is changed. Send through the new and old values.
This allows for using fields independently of the form.

## Form Options

Options are set in three layers, where the more particular overrides the more general.

1. Pre-defined defaults.
2. User-defined defaults for the global Vue Instance. Passed as the second paramter to the `Use` statement.
3. Options for a single form, passed through the `options` prop.

* `layout` `string` Bootstrap's form layout class. Defaults to a vertical block display. other options are `form-horizontal` and `form-inline`
When using a layout other than `form-horizontal` adjust the `top` rule of the `form-control-feedback` class to get the feedback icon aligned with the field.
* `labelWidth` `number` relevant only for horizontal layout. The number of grid columns allocated for the label. Defaults to `3`.
* `showErrorsInStatusBar` `boolean` Show client errors in the status bar, with links to the relevant fields, in addition to the error shown under each field. Useful for long forms. Deault: `false`,
* `additionalPayload` `object` Custom data you want to send along with the form. Serves a similar purpose to that of an hidden input field
* `customRules` `object` See [above](#custom-rules)
* `messages` `object` see [above](#messages)
* `texts` `object` Default:

        {
          sending:'Sending Form...',
          sent:'Form was successfully sent', // this will be presented in case a string is not returned from the server
          singleError:'an error was found:', // status bar errors list title
          errors:'{0} errors were found:'
        }

