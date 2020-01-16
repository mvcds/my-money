const assert = require('assert')
const { Given, When, Then } = require('cucumber')
const { random } = require('faker')
const sinon = require('sinon')

const EntryFactory = require('my-domain/entities/entry/entry.factory')

const CreateEntry = require('./index')

// TODO: move this Given to a common place
Given('the world\'s {string}', function (key) {
  this.world = Object.assign({}, this.world, { [key]: {} })
})

Given('the entry a value of {string}', function (value) {
  const key = 'presenter.entry.value'.split('.')

  setValue(this.world, key, value)
})

Given('the entry a value of {int}', function (value) {
  const key = 'presenter.entry.value'.split('.')

  setValue(this.world, key, value)
})

// TODO: move this function to a common place
function setValue (object, [key, nextKey, ...rest], value) {
  if (rest.length > 0) {
    return setValue(object[key], [nextKey, ...rest], value)
  }
  object[key] = Object.assign({}, object[key], { [nextKey]: value })
}

Given('an error when trying to create the entry', function () {
  const error = new Error(random.uuid())
  const { presenter, storage } = this.world

  presenter.projectionId = random.uuid()
  presenter.onStart = Function.prototype
  presenter.onError = sinon.mock('onError').once().withExactArgs(error)
  presenter.onEnd = Function.prototype

  storage.readProjectionById = sinon.mock('readProjectionById').throws(error)
})

Given('no errors when trying to create the entry', function () {
  const { presenter, storage, injection } = this.world

  const entry = EntryFactory.withValue(presenter.value).build()

  const projection = {
    id: random.uuid(),
    entries: [],
    addEntry: sinon.mock('projection.addEntry').once().withExactArgs(entry)
  }

  presenter.projectionId = projection.id
  presenter.onStart = Function.prototype
  presenter.onError = sinon.mock('onError').never()
  presenter.onEnd = Function.prototype

  storage.readProjectionById = sinon.mock('readProjectionById')
    .once()
    .withExactArgs(projection.id)
    .resolves(projection)
  storage.createEntry = sinon.mock('createEntry')
    .once()
    .withExactArgs(entry)
    .resolves(entry)
  storage.updateProjection = sinon.mock('updateProjection')
    .once()
    .withExactArgs(projection)
    .resolves()

  injection.Entry = sinon.mock('Entry')
    .once()
    .withExactArgs(presenter.entry)
    .returns(entry)
  injection.Projection = sinon.mock('Projection')
    .once()
    .returns(projection)

  this.world.meta = {
    projectionId: projection.id,
    entryId: entry.id
  }
})

When('I create the entry', async function () {
  const { presenter, storage, injection } = this.world

  const uc = new CreateEntry(storage, injection)

  this.world.result = await uc.create(presenter)
})

Then('creating a new entry fails', function () {
  const { storage, injection } = this.world

  Object.keys(storage).forEach((key) => {
    storage[key].verify && storage[key].verify()
  })
  Object.keys(injection).forEach((key) => {
    injection[key].verify && injection[key].verify()
  })
})

Then('creating a new entry succeeds', function () {
  const { storage, injection } = this.world

  Object.keys(storage).forEach((key) => {
    storage[key].verify && storage[key].verify()
  })
  Object.keys(injection).forEach((key) => {
    injection[key].verify && injection[key].verify()
  })
})

// TODO: move this function to a common place
Then('the world\'s {string} is verified', function (key) {
  verify(this.world, key.split('.'))
})

Then('the updated projection is undefined', function () {
  assert.equal(this.world.result.projection, null)
})

Then('the new entry is undefined', function () {
  assert.equal(this.world.result.entry, null)
})

Then('the updated projection is defined', function () {
  assert.notEqual(this.world.result.projection, null)
  assert.equal(this.world.result.projection.id, this.world.meta.projectionId)
})

Then('the new entry is defined', function () {
  assert.notEqual(this.world.result.entry, null)
  assert.equal(this.world.result.entry.id, this.world.meta.entryId)
})

function verify (object, [key, nextKey, ...rest], value) {
  if (rest.length > 0) {
    return setValue(object[key], [nextKey, ...rest], value)
  }
  object[key][nextKey].verify()
}
