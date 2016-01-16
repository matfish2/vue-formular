describe('Present the form', function(){
  var form;
  $ = require('jquery');
  var generate_form = require('../helpers/generate-form');
   beforeAll(function(done){
   generate_form("form-wrapper",'<input type="text" name="test" />',{
    layout:'form-horizontal'
   });
    setTimeout(function(){
      form= $("#form-wrapper").find("form");
      done();
    },1000);
});

it("draws the form", function() {
  expect(form.length).toBe(1);
});

it("includes html in the form", function() {
  expect(form.find("input[name=test]").length).toBe(1);
});

it("defaults to POST method", function() {
  expect(form.prop("method")).toBe("post");
});

it("supports file upload", function() {
  expect(form.prop("enctype")).toBe("multipart/form-data");
});

it("sets the layout", function() {
  expect(form.hasClass("form-horizontal")).toBe(true);
});

  afterAll(function(){
    form.remove();
  });
});
