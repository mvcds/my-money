function Scenario ({ projection }) {
  Object.defineProperty(this, 'incoming', {
    get () {
      return read(projection.incoming)
    }
  })

  Object.defineProperty(this, 'expenses', {
    get () {
      return read(projection.expenses)
    }
  })

  Object.defineProperty(this, 'difference', {
    get () {
      return this.incoming.total + this.expenses.total
    }
  })

  return this
}

function read (entries) {
  const total = entries.reduce((number, { value }) => number + value, 0)

  return {
    total,
    entries: entries.reduce((array, entry) => [
      ...array,
      {
        ...entry,
        share: entry.share(total)
      }
    ], [])
  }
}

module.exports = Scenario
