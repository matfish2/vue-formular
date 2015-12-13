  module.exports = function (id,content) {

    component = $('<div id="' + id + '"><h1>'+id+'</h1><v-form action="/send">' + content + '</v-form></div>');

    $(document.body).append(component);

    var Vue = require('vue');

   var VueFormular = require('../../index');
   Vue.use(VueFormular);

    var vm = new Vue({
      el:"#" + id,
      data: {
    }
  });

    return vm;
  }
