import Storage  from 'my-adapters/gateways/storage'

const app = {
  nextEntryId() {
    const next = JSON.parse(localStorage.getItem('my-money/app/nextEntryId') || 0) + 1
    localStorage.setItem('my-money/app/nextEntryId', next)
    return next
  }
}

const entry = {
  async create (data) {
    const entry = { ...data, id: app.nextEntryId() }

    const all = await this.readAll()

    if (all[entry.id]) return this.create(data)

    all[entry.id] = entry

    localStorage.setItem('my-money/entries', JSON.stringify(all))

    return entry
  },
  async readAll () {
    const all = localStorage.getItem('my-money/entries') || '{}'

    return JSON.parse(all)
  }
}

const projection = {
  async read ({ id }) {
    const all = await this.readAll()

    return all[id]
  },
  async update (data) {
    const all = await this.readAll()

    if (!all[data.id]) return

    localStorage.setItem('my-money/projections', JSON.stringify(all))
  },
  async readAll () {
    const all = localStorage.getItem('my-money/projections')

    if (all === null) {
      const firstRun = {
        default: {
          id: 'default',
          title: 'Standard',
          entries: []
        }
      }

      localStorage.setItem('my-money/projections', JSON.stringify(firstRun))

      return firstRun
    }

    return JSON.parse(all)
  }
}

const storage = new Storage({
  entry,
  projection
})

export default storage
