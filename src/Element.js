const {Component} = require('@nrg/core')

const filters = Symbol()
const validators = Symbol()

module.exports = class extends Component {

  _constructor (...args) {
    this[filters] = new Set()
    this[validators] = new Set()
    this.errorMessage = null

    super._constructor(...args)
  }

  get hasError () {
    return !this.validate()
  }

  get error () {
    return this.errorMessage ? this.errorMessage.toString() : null
  }

  addFilter (filter) {
    this[filters].add(filter)

    return this
  }

  addValidator (validator) {
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

  validate () {
    const value = this.filter()

    for (const validator of this[validators]) {
      if (!validator.isValid(value)) {
        this.errorMessage = validator.errorMessage

        return false
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

    return this
  }

  toString () {
    return this.value
  }
}
