const assert = require('assert')
const { random } = require('faker')
const sinon = require('sinon')

const Storage = require('./index')

describe('Entry Storage', function () {
  describe('#readEntryById', function () {
    describe('No id', function () {
      it('Throws for missing ID', async function () {
        const storage = new Storage()

        await assert.rejects(async () => storage.readEntryById(), /Missing ID when reading by ID/)
      })
    })

    describe('Some id', function () {
      let id
      let entry
      let storage
      let result
      before(async function () {
        id = random.uuid()

        entry = {
          read: sinon.mock()
            .once()
            .withExactArgs({ id })
            .resolves(id)
        }

        storage = new Storage({}, { entry })

        result = await storage.readEntryById(id)
      })

      it('Reads by id', function () {
        entry.read.verify()
      })

      it('Updates the storage', function () {
        assert.deepEqual(storage.entries, [id])
      })

      it('Returns what is read', function () {
        assert.equal(result, id)
      })
    })
  })

  describe('#createEntry', function () {
    let id
    let entry
    let storage
    let result
    before(async function () {
      id = random.uuid()

      entry = {
        create: sinon.mock()
          .once()
          .withExactArgs(id)
          .resolves({ id })
      }

      storage = new Storage({}, { entry })

      result = await storage.createEntry(id)
    })

    it('Creates the entry', function () {
      entry.create.verify()
    })

    it('Keeps the entry on storage', function () {
      assert.deepEqual(storage.entries, [{ id }])
    })

    it('Returns the new entry', function () {
      assert.deepEqual(result, { id })
    })
  })
})
