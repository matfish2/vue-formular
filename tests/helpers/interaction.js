module.exports = function(setValues, test, done) {

    promise = $.Deferred();
    setValues(vm);

    setTimeout(function() {
      promise.resolve();
    },0);

    promise.then(function() {
      test();
    }).always(done);

   }
