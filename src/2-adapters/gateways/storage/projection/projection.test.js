const assert = require('assert')
const { random } = require('faker')
const sinon = require('sinon')

const Storage = require('./index')

describe('Projection Storage', function () {
  describe('#readProjectionById', function () {
    describe('No id', function () {
      it('Throws for missing ID', async function () {
        const storage = new Storage()

        await assert.rejects(async () => storage.readProjectionById(), /Missing ID when reading by ID/)
      })
    })

    describe('Some id', function () {
      let id
      let projection
      let storage
      let result
      before(async function () {
        id = random.uuid()

        projection = {
          read: sinon.mock()
            .once()
            .withExactArgs({ id })
            .resolves(id)
        }

        storage = new Storage({}, { projection })

        result = await storage.readProjectionById(id)
      })

      it('Reads by id', function () {
        projection.read.verify()
      })

      it('Updates the storage', function () {
        assert.deepEqual(storage.projections, [id])
      })

      it('Returns what is read', function () {
        assert.equal(result, id)
      })
    })
  })

  describe('#updateProjection', function () {
    describe('No projection', function () {
      it('Throws for missing projection', async function () {
        const storage = new Storage()

        await assert.rejects(async () => storage.updateProjection(), /Missing projection to update/)
      })
    })

    describe('Unexisting projection', function () {
      it('Throws for unexisting projection', async function () {
        const storage = new Storage()

        await assert.rejects(async () => storage.updateProjection({ id: 'any' }), /Unkown projection canot be updated/)
      })
    })

    describe('Projection exists', function () {
      let projection
      let storage
      let newProjection
      before(async function () {
        const id = random.uuid()

        const oldProjection = {
          id,
          value: 'old'
        }

        newProjection = {
          id,
          value: 'new'
        }

        projection = {
          update: sinon.mock()
            .once()
            .withExactArgs(newProjection)
        }

        storage = new Storage({ [id]: oldProjection }, { projection })

        await storage.updateProjection(newProjection)
      })

      it('Updates the projection', function () {
        projection.update.verify()
      })

      it('Updates the storage', function () {
        assert.deepEqual(storage.projections, [newProjection])
      })
    })
  })
})
