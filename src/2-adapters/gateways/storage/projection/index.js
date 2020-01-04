function ProjectionStorage (oldProjections = {}, injection) {
  const projections = oldProjections
  const { projection: driver } = { ...injection }

  Object.defineProperty(this, 'projections', {
    get () {
      return Object.values(projections)
    }
  })

  return Object.assign(this, {
    async readProjectionById (id) {
      if (!id) {
        throw new Error('Missing ID when reading by ID')
      }

      const projection = await driver.read({ id })

      if (projection) {
        projection.entries = await Promise.all(projection.entries.map(this.readEntryById))
      }

      projections[id] = projection

      return projection
    },
    async updateProjection (target) {
      if (!target) {
        throw new Error('Missing projection to update')
      }

      const projection = projections[target.id]

      if (!projection) {
        throw new Error('Unkown projection canot be updated')
      }

      await driver.update(target)

      projections[target.id] = target
    },
    async createProjection (data) {
      const projection = await driver.create(data)

      projections[projection.id] = projection

      return projection
    }
  })
}

module.exports = ProjectionStorage
