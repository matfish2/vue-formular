module.exports = function() {

    return {
      'VF-Field--required':this.rules.required || this.isRequired,
      'VF-Field--disabled':this.disabled,
      'has-error':this.errors.length,
      'has-feedback':this.hasFeedback,
      'has-success':this.success
    }
  }
