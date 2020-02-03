const assert = require('assert')

const EntryFactory = require('my-domain/entities/entry/entry.factory')

const Scenario = require('./index')

describe('Scenario Object', function () {
  let scenario

  before(function () {
    scenario = new Scenario({
      projection: {
        incoming: [
          EntryFactory.withValue(2).build({ isDisabled: false }),
          EntryFactory.withValue(3).build({ isDisabled: false }),
          EntryFactory.withValue(5).build({ isDisabled: false })
        ],
        expenses: [
          EntryFactory.withValue(-4).build({ isDisabled: false })
        ]
      }
    })
  })

  describe('#incoming', function () {
    it('Calculates the total', function () {
      assert.equal(scenario.incoming.total, 10)
    })

    it('Enhances the entries', function () {
      const entries = scenario.incoming.entries.reduce((array, { value, share }) => [...array, { value, share }], [])

      assert.deepEqual(entries, [
        { value: 2, share: 0.2 },
        { value: 3, share: 0.3 },
        { value: 5, share: 0.5 }
      ])
    })
  })

  describe('#expenses', function () {
    it('Calculates the total', function () {
      assert.equal(scenario.expenses.total, -4)
    })

    it('Enhances the entries', function () {
      const entries = scenario.expenses.entries.reduce((array, { value, share }) => [...array, { value, share }], [])

      assert.deepEqual(entries, [
        { value: -4, share: 1 }
      ])
    })
  })

  describe('#difference', function () {
    it('Calculates the difference', function () {
      assert.equal(scenario.difference, 6)
    })
  })
})
