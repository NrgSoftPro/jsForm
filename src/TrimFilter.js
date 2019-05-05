module.exports = class {

  apply (value) {
    return !value ? '' : value.trim()
  }
}
