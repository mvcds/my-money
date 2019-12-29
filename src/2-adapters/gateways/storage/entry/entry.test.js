const assert = require('assert')
const { random } = require('faker')
const sinon = require('sinon')

const Storage = require('./index')

describe('Entry Storage', function () {
  describe('#createEntry', function () {
    let id
    let drive
    let storage
    let result
    before(async function () {
      id = random.uuid()

      drive = {
        create: sinon.mock()
          .once()
          .withExactArgs(id)
          .resolves({ id })
      }

      storage = new Storage({}, { drive })

      result = await storage.createEntry(id)
    })

    it('Creates the entry', function () {
      drive.create.verify()
    })

    it('Keeps the entry on storage', function () {
      assert.deepEqual(storage.entries, [{ id }])
    })

    it('Returns the new entry', function () {
      assert.deepEqual(result, { id })
    })
  })
})
