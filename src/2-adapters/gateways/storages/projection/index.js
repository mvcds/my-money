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

      const { drive } = dependencies

      const projection = await drive.read({ id })

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

      const { drive } = dependencies

      await drive.update(target)

      projections[target.id] = target
    }
  })
}

module.exports = ProjectionStorage
