class CreateEntry {
  constructor (presenter, storage) {
    this.presenter = presenter
    this.storage = storage
  }

  async execute (projection, entry) {
    this.presenter.onStart()

    try {
      await createEntryInProjection.call(this, projection, entry)
    } catch (e) {
      this.presenter.onError(e.message)
    }

    this.presenter.onEnd()
  }
}

async function createEntryInProjection (projection, entry) {
  const [storagedProjection, newEntry] = await Promise.all([
    this.storage.getProjectionById(projection.id),
    this.storage.createEntry(entry)
  ])

  await storagedProjection.associateWithEntry(newEntry)

  projection.addEntry(newEntry)
}
module.exports = CreateEntry
