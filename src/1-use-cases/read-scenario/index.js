const DEPENDENCIES = {
  Entry: require('my-domain/entities/entry'),
  Projection: require('my-domain/entities/projection'),
  Scenario: require('my-domain/objects/scenario')
}

class CreateEntry {
  constructor (storage, injection) {
    this.read = this.read.bind({
      storage,
      dependencies: { ...DEPENDENCIES, ...injection }
    })
  }

  async read (presenter) {
    const result = { scenario: null }

    presenter.onStart()

    try {
      // mimic private method
      result.scenario = await execute.call(this, presenter)
    } catch (e) {
      presenter.onError(e)
    }

    presenter.onEnd()

    return result
  }
}

async function execute (presenter) {
  const { Scenario } = this.dependencies

  const projection = await readProjection.call(this, presenter.projectionId)

  const scenario = new Scenario({ projection })

  presenter.onSuccess(scenario)

  return scenario
}

async function readProjection (projectionId) {
  const { Projection, Entry } = this.dependencies

  const { entries, ...data } = await this.storage.readProjectionById(projectionId)

  const projection = new Projection({ ...data, entries: entries.map(e => new Entry(e)) })

  return projection
}

module.exports = CreateEntry
