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

  Object.defineProperty(this, 'errors', {
    get() {
      const errors = []

      if (!value || (typeof value !== 'number' && !Number.isNaN(value))) {
        errors.push(new Error('Invalid entry value'))
      }

      return errors
    }
  });

  return Object.freeze(this)
}

module.exports = Entry
