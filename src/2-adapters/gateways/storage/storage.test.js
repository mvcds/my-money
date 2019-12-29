const assert = require('assert')
const { random } = require('faker')

const Storage = require('./index')

describe('Storage', function () {
  // I was lazy to proper unit test this
  // so I'll just make sure that a tested getter works as expected when "glued"
  it('Contains the initial values', function () {
    const id = random.uuid()

    const oldProjection = { id }

    const app = {
      valuesOf () {
        return { [id]: oldProjection }
      },
      driveOf () {
        return {}
      }
    }

    const storage = new Storage(app)

    assert.deepEqual(storage.projections, [oldProjection])
  })
})
