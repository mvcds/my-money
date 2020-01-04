const assert = require('assert')
const { random } = require('faker')
const sinon = require('sinon')

const Storage = require('./index')

describe('Entry Storage', function () {
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
