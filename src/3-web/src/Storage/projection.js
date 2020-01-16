const projection = {
  async read ({ id }) {
    const all = await this.readAll()

    const data = all[id]

    if (!data) return

    return Object.assign({}, data)
  },

  async update ({ id, incoming, expenses }) {
    const data = await this.read({ id })

    if (!data) return

    data.entries = [...incoming, ...expenses].map(entry => entry.id)

    const all = await this.readAll()

    all[id] = data

    localStorage.setItem('my-money/projections', JSON.stringify(all))
  },

  async readAll () {
    const all = localStorage.getItem('my-money/projections') || '{}'

    return JSON.parse(all)
  },

  async create (data) {
    const timestamp = Date.now()

    const projection = {
      ...data,
      id: btoa(timestamp),
      timestamp,
      entries: []
    }

    const all = await this.readAll()

    if (all[projection.id]) return this.create(data)

    all[projection.id] = projection

    localStorage.setItem('my-money/projections', JSON.stringify(all))

    return projection
  },
}

export default projection
