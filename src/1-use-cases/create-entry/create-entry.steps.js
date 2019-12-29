const { Given, When, Then } = require('cucumber')
const { random } = require('faker')
const sinon = require('sinon')

const EntryFactory = require('my-domain/entities/entry/entry.factory')

const CreateEntry = require('./index')

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

function setValue (object, [key, nextKey, ...rest], value) {
  if (rest.length > 0) {
    return setValue(object[key], [nextKey, ...rest], value)
  }
  object[key] = Object.assign({}, object[key], { [nextKey]: value })
}

Given('an error when trying to create the entry', function () {
  const error = new Error(random.uuid())
  const { presenter, injection } = this.world

  presenter.onStart = Function.prototype
  presenter.onError = sinon.mock('onError').once().withExactArgs(error)
  presenter.onEnd = Function.prototype

  injection.Entry = sinon.mock('Entry').once()
    .withExactArgs(presenter.entry)
    .throws(error)
})

Given('no errors when trying to create the entry', function () {
  const { presenter, storage, injection } = this.world

  const entry = EntryFactory.withValue(presenter.value).build()

  const projection = {
    id: random.uuid(),
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
    .withExactArgs(projection)
    .returns(projection)
})

When('I create the entry', async function () {
  const { presenter, storage, injection } = this.world

  const uc = new CreateEntry(presenter, storage, injection)

  await uc.execute()
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

Then('the world\'s {string} is verified', function (key) {
  verify(this.world, key.split('.'))
})

function verify (object, [key, nextKey, ...rest], value) {
  if (rest.length > 0) {
    return setValue(object[key], [nextKey, ...rest], value)
  }
  object[key][nextKey].verify()
}
