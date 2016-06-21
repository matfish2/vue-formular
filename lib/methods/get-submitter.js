var ajaxSubmitter = require('./submitters/ajax');
var clientSubmitter = require('./submitters/client');
var serverSubmitter = require('./submitters/server');

module.exports = function(vm) {

  if (vm.ajax) return ajaxSubmitter(vm);
  if (vm.client) return clientSubmitter(vm);

    return serverSubmitter(vm);

}
