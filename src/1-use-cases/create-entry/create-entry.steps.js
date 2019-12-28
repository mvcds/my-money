const assert = require('assert');
const { Given, When, Then } = require('cucumber')
const { random } = require('faker')
const sinon = require('sinon');

const Projection = require('my-domain/entities/projection')
const EntryFactory = require('my-domain/entities/entry/entry.factory')

const CreateEntry = require('./index')

Given('an enabled entry with invalid value of {string}', function (value) {
  const projection = new Projection({ entries: [] })
  const newEntry = EntryFactory.withValue(value).build({ isDisabled: false, id: random.uuid() })

  const storagedProjection = {
    associateWithEntry: sinon.stub().withArgs(newEntry).rejects(newEntry.errors[0])
  }

  const presenter = {
    onStart: sinon.mock().once(),
    onError: sinon.mock().once(),
    onEnd: sinon.mock().once(),
  }

  const storage = {
    getProjectionById: sinon.stub().resolves(storagedProjection),
    createEntry: sinon.stub().resolves(newEntry),
  }

  this.world = {
    entry: EntryFactory.withValue(value).build({ isDisabled: false, id: null }),
    projection,
    presenter,
    storage,
    newEntry,
    storagedProjection
  }
});

Given('an enabled entry with valid value of {int}', function (value) {
  const projection = new Projection({ entries: [] })
  const newEntry = EntryFactory.withValue(value).build({ isDisabled: false, id: random.uuid() })

  const storagedProjection = {
    associateWithEntry: sinon.mock().once().withArgs(newEntry)
  }

  const presenter = {
    onStart: sinon.mock().once(),
    onError: sinon.mock().never(),
    onEnd: sinon.mock().once(),
  }

  const storage = {
    getProjectionById: sinon.stub().resolves(storagedProjection),
    createEntry: sinon.stub().resolves(newEntry),
  }

  this.world = {
    entry: EntryFactory.withValue(value).build({ isDisabled: false, id: null }),
    projection,
    presenter,
    storage,
    newEntry,
    storagedProjection
  }
});

When('I create this entry', async function () {
  const { entry, projection, presenter, storage } = this.world

  const uc = new CreateEntry(presenter, storage)

  await uc.execute(projection, entry)
});

Then('a new {string} is added to the projection', function (direction) {
  const { newEntry, projection, presenter } = this.world

  assert.deepEqual(projection[direction], [newEntry])

});

Then('the create-entry-presenter was called correctly', function () {
  const { presenter } = this.world

  Object.values(presenter).forEach(mock => mock.verify())
});

Then('the projection is associated with entry', function () {
  const { storagedProjection } = this.world

  storagedProjection.associateWithEntry.verify()
});

Then('an error for {string} is registered', function (error) {
  const { presenter, newEntry } = this.world

  presenter.onError.verify()
  assert.equal(newEntry.errors[0].message, error)
});
