function Projection ({ id, title, timestamp, entries }) {
  Object.assign(this, {
    id,
    title,
    timestamp,
    addEntry (entry) {
      entries.push(entry)
    }
  })

  Object.defineProperty(this, 'incoming', {
    get () {
      return entries.filter(({ value }) => value > 0)
    }
  })

  Object.defineProperty(this, 'expenses', {
    get () {
      return entries.filter(({ value }) => value < 0)
    }
  })

  return Object.freeze(this)
}

module.exports = Projection
