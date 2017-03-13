module.exports = function() {
  var that = this;
  if (this.validation && this.validation.rules) {

    for (var field in this.validation.rules) {
      for (var rule in this.validation.rules[field]) {

        if (['requiredIf','requiredAndShownIf','smallerThan','greaterThan'].indexOf(rule)>-1) {
          field = field.split(":")[0];
          var foreignFields = this.validation.rules[field][rule].split(":")[0].split(',');

          foreignFields.forEach(function(foreignField) {
            if (typeof that.relatedFields[foreignField]=='undefined') {
              that.relatedFields[foreignField] = [];
            }
            that.relatedFields[foreignField].push(field);
          });

        }
      }
    }
  }
}
