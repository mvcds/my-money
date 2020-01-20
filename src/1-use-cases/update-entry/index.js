const DEPENDENCIES = {
  Entry: require('my-domain/entities/entry'),
  Projection: require('my-domain/entities/projection')
}

class UpdateEntry {
  constructor (storage, injection) {
    this.update = this.update.bind({
      storage,
      dependencies: { ...DEPENDENCIES, ...injection }
    })
  }

  async update (presenter) {
    let result = { entry: null }

    presenter.onStart()

    try {
      // mimic private method
      result = await execute.call(this, presenter)
    } catch (e) {
      presenter.onError(e)
    }

    presenter.onEnd()

    return result
  }
}

async function execute ({ entryId: id, payload }) {
  const entry = await this.storage.updateEntry({ id, ...payload })

  return { entry }
}

module.exports = UpdateEntry
