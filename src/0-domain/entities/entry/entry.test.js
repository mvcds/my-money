const assert = require('assert');
const { random } = require('faker');

const Entry = require('./index')

describe('Entry Entity', function() {
  describe('#share', function() {
    const total = random.number()
    const entry = new Entry({ value: total })

    describe('Equals to total', function() {
      it('Returns 1', () => {
        assert.equal(entry.share(total), 1);
      })
    });

    describe('Half of total', function() {
      it('Returns half', () => {
        assert.equal(entry.share(total * 2), .5);
      })
    });

    describe('Double of total', function() {
      it('Gives an error', () => {
        assert.throws(() => entry.share(15), /Share cannot be bigger than total/)
      })
    });
  });
});
