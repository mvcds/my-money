function EntryStorage (oldEntries = {}, injection) {
  const entries = oldEntries
  const { entry: driver } = { ...injection }

  Object.defineProperty(this, 'entries', {
    get () {
      return Object.values(entries)
    }
  })

  return Object.assign(this, {
    async readEntryById (id) {
      if (!id) {
        throw new Error('Missing ID when reading by ID')
      }

      const entry = await driver.read({ id })

      entries[id] = entry

      return entry
    },
    async createEntry (data) {
      const entry = await driver.create(data)

      entries[entry.id] = entry

      return entry
    },
    async updateEntry (data) {
      const entry = await driver.update(data)

      entries[data.id] = entry

      return entry
    }
  })
}

module.exports = EntryStorage
