const assert = require('assert')
const { random } = require('faker')
const sinon = require('sinon')

const Storage = require('./index')

describe('Entry Storage', function () {
  describe('#createEntry', function () {
    let id
    let driver
    let storage
    let result
    before(async function () {
      id = random.uuid()

      driver = {
        create: sinon.mock()
          .once()
          .withExactArgs(id)
          .resolves({ id })
      }

      storage = new Storage({}, { driver })

      result = await storage.createEntry(id)
    })

    it('Creates the entry', function () {
      driver.create.verify()
    })

    it('Keeps the entry on storage', function () {
      assert.deepEqual(storage.entries, [{ id }])
    })

    it('Returns the new entry', function () {
      assert.deepEqual(result, { id })
    })
  })
})
