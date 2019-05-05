const {Component} = require('@nrg/core')

const elements = Symbol()

module.exports = class extends Component {

  _constructor (...args) {
    this[elements] = new Set()

    super._constructor(...args)
  }

  get hasErrors () {
    let hasErrors = false

    for (const element of this) {
      if (element.hasError && !hasErrors) {
        hasErrors = true
      }
    }

    return hasErrors
  }

  get values () {
    const values = {}
    for (const element of this) {
      values[element.name] = element.filter()
    }

    return values
  }

  set values (data) {
    for (const element of this) {
      if (undefined !== data[element.name]) {
        element.value = data[element.name]
      }
    }

    return this
  }

  get errorMessages () {
    const errors = {}
    for (const element of this) {
      errors[element.name] = element.errorMessage
    }

    return errors
  }

  get errors () {
    const errors = {}
    for (const element of this) {
      errors[element.name] = element.error
    }

    return errors
  }

  set errors (errors) {
    for (const element of this) {
      if (undefined !== errors[element.name]) {
        element.error = errors[element.name]
      }
    }
  }

  addElement (element) {
    this[elements].add(element)

    return this
  }

  reset () {
    for (const element of this) {
      element.reset()
    }

    return this
  }

  [Symbol.iterator] () {
    return this[elements].values()
  }
}
