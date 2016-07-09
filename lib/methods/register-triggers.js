module.exports = function() {
  for (var field in this.triggers) {

    field = field.split(":")[0];
    var foreignField = this.validation.rules[field][rule].split(":")[0];

    if (typeof this.relatedFields[foreignField]=='undefined') {
      this.relatedFields[foreignField] = [];
    }

    this.relatedFields[foreignField].push(field);

  }

}
