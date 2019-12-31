const assert = require('assert')
const { random } = require('faker')
const sinon = require('sinon')

const Storage = require('./index')
const ProjectionStorage = require('./projection')

describe('Storage', function () {
  describe('#init', function () {
    describe('No drive provided', function () {
      it('Throws for missing drive', async function () {
        const driveless = random.uuid()

        const storage = new Storage({
        }, {
          storages: {
            driveless
          }
        })

        await assert.rejects(async () => {
          await storage.init()
        }, `A drive for ${driveless} was not found`)
      })
    })

    describe('Match of drive and storage', function () {
      it('Contains the initial values', async function () {
        const id = random.uuid()

        const oldProjection = { id }

        const storage = new Storage({
          projection: {
            readAll: sinon.mock('projection')
              .once()
              .withExactArgs()
              .resolves([oldProjection])
          }
        }, {
          storages: {
            projection: ProjectionStorage
          }
        })

        await storage.init()

        assert.deepEqual(storage.projections, [oldProjection])
      })
    })
  })
})
