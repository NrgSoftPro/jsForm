const {Component} = require('@nrg/core')

const filters = Symbol()
const validators = Symbol()

module.exports = class extends Component {

  _constructor (...args) {
    this[filters] = new Set()
    this[validators] = new Set()

    super._constructor(...args)
  }

  get hasError () {
    const
      value = this.filter(),
      result = this.validate(value)

    if (true === result) {
      this.errorMessage = null

      return false
    }

    this.errorMessage = this.t ? this.t(result) : result.toString()

    return true
  }

  onSetErrorMessage ({value}) {
    this.isValid = undefined === value ? undefined : !value
  }

  addFilter (filter) {
    this[filters].add(filter)

    return this
  }

  addValidator (validator) {
    validator.element = this
    this[validators].add(validator)

    return this
  }

  filter () {
    let value = this.value
    for (const filter of this[filters]) {
      value = filter.apply(value)
    }

    return value
  }

  validate (value) {
    for (const validator of this[validators]) {
      if (!validator.isValid(value)) {
        return validator.errorMessage
      }
    }

    return true
  }

  resetValue () {
    this.value = ''
  }

  reset () {
    this.resetValue()
    this.errorMessage = undefined
    this.isValid = undefined

    return this
  }

  toString () {
    return this.value
  }
}
