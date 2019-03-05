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
      if (element.hasError) {
        hasErrors = true
      }
    }

    return hasErrors
  }

  set errorMessages (errorMessages) {
    for (const element of this) {
      element.errorMessage = errorMessages[element.name] ? errorMessages[element.name] : null
    }
  }

  addElement (element) {
    this[elements].add(element)

    return this
  }

  deleteElement (element) {
    this[elements].delete(element)

    return this
  }

  hasElement (name) {
    for (const element of this) {
      if (element.name === name) {
        return true
      }
    }

    return false
  }

  getElement (name) {
    for (const element of this) {
      if (element.name === name) {
        return element
      }
    }
  }

  reset () {
    for (const element of this) {
      element.reset()
    }

    return this
  }

  populate (data) {
    for (const element of this) {
      if (undefined !== data[element.name]) {
        element.value = data[element.name]
      }
    }

    return this
  }

  serialize () {
    const data = {}

    for (const element of this) {
      data[element.name] = element.filter()
    }

    return data
  }

  focus () {
    for (const element of this) {
      if (element.focus) {
        element.focus()
        break
      }
    }

    return this
  }

  [Symbol.iterator] () {
    return this[elements].values()
  }
}
