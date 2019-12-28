const { Factory } = require('rosie')
const { random, lorem } = require('faker')

const Entry = require('./index')

const factory = Factory.define('Entry', Entry)
  .attrs({
    id: random.uuid,
    source: lorem.words,
    value: random.number,
    isDisabled: random.boolean
  })

module.exports = {
  withValue: (value) => ({
    build: (data = {}) => factory.build({ ...data, value })
  })
}
