function EntryStorage (oldEntries = {}, injection) {
  const entries = oldEntries
  const dependencies = { ...injection }

  Object.defineProperty(this, 'entries', {
    get () {
      return Object.values(entries)
    }
  })

  return Object.assign(this, {
    async createEntry (data) {
      const { drive } = dependencies

      const entry = await drive.create(data)

      entries[entry.id] = entry

      return entry
    }
  })
}

module.exports = EntryStorage
