const assert = require('assert');

const EntryFactory = require('my-domain/entities/entry/entry.factory')

const Scenario = require('./index')

describe('Scenario Object', function() {
  const scenario = new Scenario({
    projection: {
      incoming: [
        EntryFactory.withValue(2).build(),
        EntryFactory.withValue(3).build(),
        EntryFactory.withValue(5).build(),
      ],
      expenses: [
        EntryFactory.withValue(4).build(),
      ],
    }
  })

  describe('#incoming', () => {
    it('Calculates the total', () => {
      assert.equal(scenario.incoming.total, 10)
    })

    it('Enhances the entries', () => {
      const entries = scenario.incoming.entries.reduce((array, { value, share }) => [...array, { value, share }], [])

      assert.deepEqual(entries, [
        { value: 2, share: 0.2 },
        { value: 3, share: 0.3 },
        { value: 5, share: 0.5 },
      ])
    })
  })

  describe('#expenses', () => {
    it('Calculates the total', () => {
      assert.equal(scenario.expenses.total, 4)
    })

    it('Enhances the entries', () => {
      const entries = scenario.expenses.entries.reduce((array, { value, share }) => [...array, { value, share }], [])

      assert.deepEqual(entries, [
        { value: 4, share: 1 }
      ])
    })
  })

  describe('#difference', () => {
    it('Calculates the difference', () => {
      assert.equal(scenario.difference, 6)
    })
  })
});
