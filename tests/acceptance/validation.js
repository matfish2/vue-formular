var moment = require('moment');
var interaction = require('../helpers/interaction');

describe('Validation', function(){
  var form;
  $ = require('jquery');
  var generate_form = require('../helpers/generate-form');
   beforeAll(function(done){
    var validation = {
            rules: {
                list1: {
                    required:true
                },
                date1: {
                    greaterThan:'date2'
                },
                 first_name: {
                required:true
            },
            list: {
                required:true
            },
            email: {
                email:true,
                remote:'available',
                requiredAndShownIf:'list:1,2'
            },
               required_if_multiple: {
                requiredAndShownIf:'list_multiple:2,3'
            },
            between_numeric: {
              integer:true,
              between:[1,10]
            },
                between_string: {
              between:[11,23]
            },
            stock: {
                digits:true,
                min:4
            },
            url: {
                url:true
            },
            integer:{
                integer:true,
                max:6
            },
            float: {
              number:true
            }
            },
            messages:{
                first_name: {
                    required:"custom message for :field"
                }
            }

        };
   vm = generate_form("validation",require('../helpers/fields.html'),{},validation);
    setTimeout(function(){
      form= $("#validation").find("form");
      done();
    },1000);
});

function field(field) {
  return form.find("#" + field);
}

it("date greaterThan related field - INVALID", function(done) {

    interaction(function(vm) {
        vm.$children[0].getField("date2").value = moment("2015-04-04");
    }, function() {
       var t = field("date1").find(".VF-ValidationError").text();
     expect(t.length).toBeGreaterThan(0);
   }, done);

});


it("date greaterThan related field - VALID", function(done) {


    interaction(function(vm) {
        vm.$children[0].getField("date2").value = moment("2004-04-04");
    }, function() {
       var t = field("date1").find(".VF-ValidationError").text();
     expect(t.length).toBe(0);
   }, done);

});



it("required INVALID", function(done) {

    interaction(function(vm) {
       vm.$children[0].getField("first_name").value = "";
    }, function() {
       var t = field("first_name").find(".VF-ValidationError").text();
     expect(t.length).toBeGreaterThan(0);
   }, done);

});

it("digits INVALID", function(done) {

    interaction(function(vm) {
       vm.$children[0].getField("stock").value = "123A5";
    }, function() {
       var t = field("stock").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);
   }, done);


});

it("digits VALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("stock").value = "1234";
    }, function() {
       var t = field("stock").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);
   }, done);
});


it("Email - INVALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("email").value = "matfish@com";
    }, function() {
       var t = field("email").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);
   }, done);
});

it("Email - VALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("email").value = "matfish@gmail.com";
    }, function() {
       var t = field("email").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);
   }, done);
})


it("Integer - INVALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("integer").value = "4.55";
    }, function() {
       var t = field("integer").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);
   }, done);
})

it("Integer - VALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("integer").value = "5";
    }, function() {
       var t = field("integer").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);
   }, done);
})

it("float - INVALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("float").value = "4.ff";
    }, function() {
       var t = field("float").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);
   }, done);
})

it("float - VALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("float").value = "5.55";
    }, function() {
       var t = field("float").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);
   }, done);
})

it("max - numeric - INVALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("integer").value = "7";
    }, function() {
       var t = field("integer").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);
   }, done);
})

it("max - numeric - VALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("integer").value = "6";
    }, function() {
       var t = field("integer").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);
   }, done);
})

it("min - string - INVALID", function(done) {

    interaction(function(vm) {
       vm.$children[0].getField("stock").value = "123";
    }, function() {
       var t = field("stock").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);
   }, done);

});

it("min - string - VALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("stock").value = "12345";
    }, function() {
       var t = field("stock").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);
   }, done);
});

it("between - string - INVALID", function(done) {

    interaction(function(vm) {
       vm.$children[0].getField("between_string").value = "lessThan11";
    }, function() {
       var t = field("between_string").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);
   }, done);

});

it("between - string - VALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("between_string").value = "more than 11 characters";
    }, function() {
       var t = field("between_string").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);

   }, done);
});

it("url - INVALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("url").value = "https://wwwinvalid";
    }, function() {
       var t = field("url").find(".VF-ValidationError").text();

     expect(t.length).toBeGreaterThan(0);

   }, done);
});

it("url - INVALID", function(done) {

        interaction(function(vm) {
        vm.$children[0].getField("url").value = "http://www.valid-url.com";
    }, function() {
       var t = field("url").find(".VF-ValidationError").text();

     expect(t.length).toBe(0);

   }, done);
});

it("requiredif - Field not shown when not required", function() {

   isFieldVisibile = field("email").is(":visible");

   expect(isFieldVisibile).toBe(false);

});

it("requiredif - Field shown when required", function(done) {

    interaction(function(vm) {
        vm.$children[0].getField("list").value = "1";
    }, function() {
        isFieldVisibile = field("email").is(":visible");
        expect(isFieldVisibile).toBe(true);

   }, done);
});


it("requiredif - depends on multiple list - Field not shown when not required", function(done) {

    interaction(function(vm) {
        vm.$children[0].getField("list_multiple").value = ["1"];
    }, function() {
        isFieldVisibile = field("required_if_multiple").is(":visible");
        expect(isFieldVisibile).toBe(false);

   }, done);
});

it("requiredif - depends on multiple list - Field shown when required", function(done) {

    interaction(function(vm) {
        vm.$children[0].getField("list_multiple").value = ["2","3"];
    }, function() {
        isFieldVisibile = field("required_if_multiple").is(":visible");
        expect(isFieldVisibile).toBe(true);

   }, done);
})



  afterAll(function(){
  form.remove();
  });
});
