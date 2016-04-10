module.exports = function() {

  var options = {
    labelWidth:3,
    layout:'',
    showErrorsInStatusBar:false,
    sendOnlyDirtyFields:false,
    additionalPayload:{},
    customRules:{},
    fileOptions: {},
    dateOptions:{},
    select2Options:{},
    texts: {
      sending:'Sending Form...',
      sent:'Form was successfully sent',
      singleError:'an error was found:',
      errors:'{0} errors were found:'
    }
  };

  options.messages = require('../validation/messages/messages')();

  return options;

}
