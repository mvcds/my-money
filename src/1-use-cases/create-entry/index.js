const DEPENDENCIES = {
  Entry: require('my-domain/entities/entry'),
  Projection: require('my-domain/entities/projection')
}

class CreateEntry {
  constructor (presenter, storage, injection) {
    this.execute = this.execute.bind({
      presenter,
      storage,
      injection: { ...DEPENDENCIES, ...injection }
    })
  }

  async execute () {
    this.presenter.onStart()

    try {
      // mimic private method
      await create.call(this)
    } catch (e) {
      this.presenter.onError(e)
    }

    this.presenter.onEnd()
  }
}

async function create () {
  const { Entry, Projection } = this.injection
  const { projectionId, entry: data } = this.presenter

  const newEntry = new Entry(data)

  const [projection, entry] = await Promise.all([
    this.storage.readProjectionById(projectionId),
    this.storage.createEntry(newEntry)
  ])

  const updatedProjection = new Projection(projection)

  updatedProjection.addEntry(entry)

  await this.storage.updateProjection(updatedProjection)
}
module.exports = CreateEntry
