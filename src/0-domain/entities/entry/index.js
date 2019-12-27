function Entry({ id, source, value, isDisabled = false }) {
  Object.assign(this, {
    id,
    source,
    value,
    isDisabled,
    share(total) {
      if (total < value) throw new Error('Share cannot be bigger than total')

      return value / total
    }
  })

  return Object.freeze(this)
}

module.exports = Entry
