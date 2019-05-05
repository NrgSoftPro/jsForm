const {Value} = require('@nrg/core')
const {Message} = require('@nrg/i18n')

const restrictions = Symbol()

module.exports = class extends Value {

  get defaults () {
    return {
      errorText: 'please fill out this field',
      restrictions: [null, '', undefined, 'undefined']
    }
  }

  set restrictions (data) {
    this[restrictions] = data
  }

  isValid (value) {
    this.errorMessage = new Message(this.errorText)

    if (Array.isArray(value)) {
      return !value.length
    }

    return !this[restrictions].includes(value)
  }
}
