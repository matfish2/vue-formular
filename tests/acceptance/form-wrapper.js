describe('Present the form', function(){

  $ = require('jquery');
  var generate_form = require('../helpers/generate-form');
  var form = "form-wrapper";
  beforeAll(function(done){
   generate_form(form,'<input type="text" name="test" />');
    setTimeout(function(){
      done();
    },1000);
});

it("draws the form", function() {
  expect($("#" + form).length).toBe(1);
});

it("includes html in the form", function() {
  expect($("#" + form).find("input[name=test]").length).toBe(1);
});

  afterAll(function(){
   $("#" + form).remove();
  });
});
