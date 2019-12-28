const assert = require('assert')
const { random } = require('faker')

const Entry = require('./index')

describe('Entry Entity', function () {
  describe('#share', function () {
    let total, entry

    before(function () {
      total = random.number()
      entry = new Entry({ value: total })
    })

    describe('Equals to total', function () {
      it('Returns 1', function () {
        assert.equal(entry.share(total), 1)
      })
    })

    describe('Half of total', function () {
      it('Returns half', function () {
        assert.equal(entry.share(total * 2), 0.5)
      })
    })

    describe('Double of total', function () {
      it('Gives an error', function () {
        assert.throws(() => entry.share(15), /Share cannot be bigger than total/)
      })
    })
  })

  describe('#errors', function () {
    describe('Value', function () {
      const VALUE_ERRORS = [/Invalid entry value/]

      describe('Number', function () {
        it('Has no errors', function () {
          const entry = new Entry({ value: random.number() })

          assert.deepEqual(entry.errors, [])
        })
      })

      describe('Emtpy', function () {
        it('Has an error', function () {
          const entry = new Entry({})

          assert.deepEqual(entry.errors, VALUE_ERRORS)
        })
      })

      describe('String as number', function () {
        it('Has an error', function () {
          const entry = new Entry({ value: random.number().toString() })

          assert.deepEqual(entry.errors, VALUE_ERRORS)
        })
      })

      describe('NaN', function () {
        it('Has an error', function () {
          const entry = new Entry({ value: NaN })

          assert.deepEqual(entry.errors, VALUE_ERRORS)
        })
      })
    })
  })
})
