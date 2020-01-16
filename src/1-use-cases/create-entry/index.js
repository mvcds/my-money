const DEPENDENCIES = {
  Entry: require('my-domain/entities/entry'),
  Projection: require('my-domain/entities/projection')
}

class CreateEntry {
  constructor (storage, injection) {
    this.create = this.create.bind({
      storage,
      dependencies: { ...DEPENDENCIES, ...injection }
    })
  }

  async create (presenter) {
    presenter.onStart()

    try {
      // mimic private method
      await execute.call(this, presenter)
    } catch (e) {
      presenter.onError(e)
    }

    presenter.onEnd()
  }
}

async function execute ({ projectionId, entry: data }) {
  const [projection, entry] = await Promise.all([
    readProjection.call(this, projectionId),
    createEntry.call(this, data)
  ])

  projection.addEntry(entry)

  await this.storage.updateProjection(projection)
}

async function readProjection (projectionId) {
  const { Projection, Entry } = this.dependencies

  const { entries, ...data } = await this.storage.readProjectionById(projectionId)

  const projection = new Projection({ ...data, entries: entries.map(e => new Entry(e)) })

  return projection
}

async function createEntry (data) {
  const { Entry } = this.dependencies

  const idlessEntity = new Entry(data)

  const entry = await this.storage.createEntry(idlessEntity)

  return entry
}

module.exports = CreateEntry
