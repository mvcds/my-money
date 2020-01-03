import Storage  from 'my-adapters/gateways/storage'

const app = {
  nextEntryId() {
    const next = JSON.parse(localStorage.getItem('my-money/app/nextEntryId') || 0) + 1
    localStorage.setItem('my-money/app/nextEntryId', next)
    return next
  }
}

const storage = new Storage({
  entry: {
    async create (data) {
      const entry = { ...data, id: app.nextEntryId() }

      const list = await this.readAll()

      if (list[entry.id]) return this.create(data)

      list[entry.id] = entry

      localStorage.setItem('my-money/entries', JSON.stringify(list))

      return entry
    },
    async readAll () {
      const entries = localStorage.getItem('my-money/entries') || '{}'

      return JSON.parse(entries)
    }
  },
  projection: {
    async read ({ id }) {
      const projections = await this.readAll()

      return projections[id]
    },
    async update (data) {
      const projections = await this.readAll()

      if (!projections[data.id]) return

      localStorage.setItem('my-money/projections', JSON.stringify(projections))
    },
    async readAll () {
      const projections = localStorage.getItem('my-money/projections')

      if (projections === null) {
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

      return JSON.parse(projections)
    }
  }
})

export default storage