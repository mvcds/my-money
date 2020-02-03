const assert = require('assert')

const Projection = require('./index')

describe('Projection Entity', function () {
  describe('Reading entries', function () {
    const projection = new Projection({
      entries: [
        { value: -1 },
        { value: -1, isDisabled: true },
        { value: -1, isDisabled: true },
        { value: 0 },
        { value: 1 },
        { value: 1, isDisabled: true },
        { value: 1, isDisabled: true }
      ]
    })

    describe('#incoming', function () {
      let result
      before(function () {
        result = projection.incoming.map(entry => entry.value)
      })

      it('Ignores negative values', function () {
        assert.equal(result.includes(-1), false)
      })

      it('Ignores neutral values', function () {
        assert.equal(result.includes(0), false)
      })

      it('Contains positive values', function () {
        assert.equal(result.includes(1), true)
      })
    })

    describe('#expenses', function () {
      let result
      before(function () {
        result = projection.expenses.map(entry => entry.value)
      })

      it('Contains negative values', function () {
        assert.equal(result.includes(-1), true)
      })

      it('Ignores neutral values', function () {
        assert.equal(result.includes(0), false)
      })

      it('Ignores positive values', function () {
        assert.equal(result.includes(1), false)
      })
    })
  })

  describe('#addEntry', function () {
    describe('Enabled entry', function () {
      it('Accepts the new entry', function () {
        const projection = new Projection({
          entries: [
            { value: 1, isDisabled: false }
          ]
        })

        projection.addEntry({ value: 1, isDisabled: false })

        assert.equal(projection.incoming.length, 2)
      })
    })
  })
})
