const app = {
  nextEntryId () {
    const next = JSON.parse(localStorage.getItem('my-money/app/nextEntryId') || 0) + 1
    localStorage.setItem('my-money/app/nextEntryId', next)
    return next
  }
}

const entry = {
  async read ({ id }) {
    const all = await this.readAll()

    const data = all[id]

    if (!data) return

    return Object.assign({}, data)
  },

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

export default entry
