function Scenario (data) {
  const { projection } = data

  Object.assign(this, {
    projectionId: projection.id,
    clone (raw) {
      return new Scenario({ ...data, ...raw })
    }
  })

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

  return Object.freeze(this)
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
