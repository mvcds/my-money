const DEPENDENCIES = {
  Entry: require('my-domain/entities/entry'),
  Projection: require('my-domain/entities/projection')
}

class CreateEntry {
  constructor (storage, injection) {
    this.execute = this.execute.bind({
      storage,
      injection: { ...DEPENDENCIES, ...injection }
    })
  }

  async execute (presenter) {
    presenter.onStart()

    try {
      // mimic private method
      await create.call(this, presenter)
    } catch (e) {
      presenter.onError(e)
    }

    presenter.onEnd()
  }
}

async function create ({ projectionId, entry: data }) {
  const { Entry, Projection } = this.injection

  const newEntry = new Entry(data)

  const [projectionData, entry] = await Promise.all([
    this.storage.readProjectionById(projectionId),
    this.storage.createEntry(newEntry)
  ])

  const projection = new Projection(projectionData)

  projection.addEntry(entry)

  await this.storage.updateProjection(projection)
}
module.exports = CreateEntry
