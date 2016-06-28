describe('Displays all field types', function(){
  var form;
  $ = require('jquery');
  var generate_form = require('../helpers/generate-form');
   beforeAll(function(done){
   generate_form("fields",require('../helpers/fields.html'),{});
    setTimeout(function(){
      form= $("#fields").find("form");
      done();
    },1000);
});

function field(field) {
  return form.find(".VF-Field--" + field);
}

it("date", function() {
  var dates = field("Date");
  expect(dates.length).toBe(2);
  expect(dates.eq(0).find("label").text()).toBe("Date 1");
  expect(dates.eq(0).find(".VF-Field--Date__date").text()).toBe("12/12/2005");
  expect(dates.eq(1).find(".VF-Field--Date__date").text()).toBe("Select Date");
});

it("text input", function() {
  var texts = field("Text");

  expect(texts.length).toBe(6);
  expect(texts.eq(0).find("input").length).toBe(1);
  expect(texts.eq(3).find("input").prop("placeholder")).toBe("http://www.example.com");
expect(texts.eq(4).find("input").val()).toBe("4");

});

it("select", function() {
  var selects = field("Select");
  expect(selects.length).toBe(2);
  expect(selects.eq(0).find("select").prop("multiple")).toBe(true);
  expect(selects.eq(0).find("select").val()).toEqual(["2","3"]);

  expect(selects.eq(1).find("select").prop("multiple")).toBe(false);


});

it("file", function() {
  expect(field("File").length).toBe(1);
  expect(field("File").eq(0).find("input").prop("type")).toBe("file");
});

it("Email", function() {
  expect(field("Email").length).toBe(1);
  expect(field("Email").eq(0).find("input").prop("type")).toBe("email");
});

it("Textarea", function() {
  expect(field("Textarea").length).toBe(1);
  expect(field("Textarea").eq(0).find("textarea").length).toBe(1);
});

it("buttons list", function() {
  var lists = field("Buttons");

  expect(lists.length).toBe(2);
  expect(lists.eq(0).find("input").length).toBe(3);
  expect(lists.eq(0).find("input").eq(0).prop("type")).toBe("radio");

  expect(lists.eq(0).find("input").eq(0).is(":checked")).toBe(false);
  expect(lists.eq(0).find("input").eq(1).is(":checked")).toBe(true);
  expect(lists.eq(0).find("input").eq(2).is(":checked")).toBe(false);

  expect(lists.eq(1).find("input").length).toBe(3);
  expect(lists.eq(1).find("input").eq(0).prop("type")).toBe("checkbox");

  expect(lists.eq(1).find("input").eq(0).is(":checked")).toBe(true);
  expect(lists.eq(1).find("input").eq(1).is(":checked")).toBe(true);
  expect(lists.eq(1).find("input").eq(2).is(":checked")).toBe(false);

});

it("Submit", function() {
  expect(form.find("button[type=submit]").length).toBe(1);
});



  afterAll(function(){
    form.remove();
  });
});
