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

    describe('Existing projection', function () {
      let data
      let projection
      let storage
      let result
      before(async function () {
        data = {
          id: random.uuid(),
          entries: [random.uuid()]
        }

        projection = {
          read: sinon.mock()
            .once()
            .withExactArgs({ id: data.id })
            .resolves(data)
        }

        storage = new Storage({}, { projection })

        storage.readEntryById = sinon.mock('readEntryById').once().withArgs(data.entries[0]).resolves()

        result = await storage.readProjectionById(data.id)
      })

      it('Reads by id', function () {
        projection.read.verify()
      })

      it('Updates the storage', function () {
        assert.deepEqual(storage.projections, [data])
      })

      it('Returns what is read', function () {
        assert.equal(result, data)
      })

      it('Enhances the entries', function () {
        storage.readEntryById.verify()
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
