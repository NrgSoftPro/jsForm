const {Value} = require('@nrg/core')
const {Message} = require('@nrg/i18n')

module.exports = class extends Value {

  get defaults () {
    return {
      errorText: 'please provide a valid email'
    }
  }

  get pattern () {
    return /^[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9\u007F-\uffff!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i
  }

  isValid (value) {
    if (['', undefined, null].includes(value)) {
      return true
    }

    this.errorMessage = new Message(this.errorText)

    return this.pattern.exec(value)
  }
}
