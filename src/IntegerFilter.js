module.exports = class {

  apply (value) {
    const intValue = parseInt(value)

    return intValue.toString() === value ? intValue : value
  }
}
