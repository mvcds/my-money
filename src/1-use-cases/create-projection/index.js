const DEPENDENCIES = {
  Projection: require('my-domain/entities/projection')
}

class CreateProjection {
  constructor (storage, injection) {
    this.create = this.create.bind({
      storage,
      dependencies: { ...DEPENDENCIES, ...injection }
    })
  }

  async create (presenter) {
    const { Projection } = this.dependencies

    presenter.onStart()

    try {
      const idlessEntity = new Projection({ ...presenter.projection, entries: [] })

      await this.storage.createProjection(idlessEntity)
    } catch (e) {
      presenter.onError(e)
    }

    presenter.onEnd()
  }
}

module.exports = CreateProjection
