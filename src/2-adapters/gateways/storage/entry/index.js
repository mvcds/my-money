function EntryStorage (oldEntries = {}, injection) {
  const entries = oldEntries
  const { entry: driver } = { ...injection }

  Object.defineProperty(this, 'entries', {
    get () {
      return Object.values(entries)
    }
  })

  return Object.assign(this, {
    async createEntry (data) {
      const entry = await driver.create(data)

      entries[entry.id] = entry

      return entry
    }
  })
}

module.exports = EntryStorage
