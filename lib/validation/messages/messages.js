module.exports = function() {
  return {
    required:'The field :field is required',
    number:'The field :field must be numeric',
    integer:'Integer only',
    digits:'Digits only',
    email:'Please enter a valid Email address',
    between:{
      string:'the field :field must contain between {0} and {1} characters',
      number:'Please pass a number between {0} and {1}',
    },
    min: {
      string:'The field :field must contain at least {0} characters',
      number:'Please pass a number equal or greater than {0}',
    },
    max: {
      string:'The field :field must contain no more than {0} characters',
      number:'Please pass a number equal or greater than {0}',
    },
    remote:'Remote Error',
    date:'Invalid date',
    requiredIf:'The field :field is required',
    url:'Please enter a valid URL',
    greaterThan:'The field :field must be greater than :relatedField',
    smallerThan:'The field :field must be smaller than :relatedField'
  }
}
