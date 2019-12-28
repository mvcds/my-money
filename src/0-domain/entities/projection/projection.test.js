const assert = require('assert');

const Projection = require('./index')

describe('Projection Entity', function() {
  const projection = new Projection({
    entries: [
      { value: -1 },
      { value: -1, isDisabled: true },
      { value: -1, isDisabled: true },
      { value: 0 },
      { value: 1 },
      { value: 1, isDisabled: true },
      { value: 1, isDisabled: true },
    ]
  })

  describe('#incoming', () => {
    let result
    before(() => {
      result = projection.incoming.map(entry => entry.value)
    })

    it('Ignores negative values', () => {
      assert.equal(result.includes(-1), false)
    })

    it('Ignores neutral values', () => {
      assert.equal(result.includes(0), false)
    })

    it('Contains positive values', () => {
      assert.equal(result.includes(1), true)
    })

    it('Ignores disabled positive values', () => {
      assert.equal(result.length, 1)
    })
  })

  describe('#expenses', () => {
    let result
    before(() => {
      result = projection.expenses.map(entry => entry.value)
    })

    it('Contains negative values', () => {
      assert.equal(result.includes(-1), true)
    })

    it('Ignores disabled negative values', () => {
      assert.equal(result.length, 1)
    })

    it('Ignores neutral values', () => {
      assert.equal(result.includes(0), false)
    })

    it('Ignores positive values', () => {
      assert.equal(result.includes(1), false)
    })
  })
});
