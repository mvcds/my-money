function ProjectionStorage (oldProjections = {}, injection) {
  const projections = oldProjections
  const dependencies = { ...injection }

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

      const { driver } = dependencies

      const projection = await driver.read({ id })

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

      const { driver } = dependencies

      await driver.update(target)

      projections[target.id] = target
    }
  })
}

module.exports = ProjectionStorage
