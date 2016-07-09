module.exports = function() {
  for (var field in this.validation.rules) {
    for (var rule in this.validation.rules[field]) {

      if (['requiredIf','smallerThan','greaterThan'].indexOf(rule)>-1) {
        field = field.split(":")[0];
        var foreignField = this.validation.rules[field][rule].split(":")[0];

        if (typeof this.relatedFields[foreignField]=='undefined') {
          this.relatedFields[foreignField] = [];
        }
        this.relatedFields[foreignField].push(field);

      }
    }
  }
}
