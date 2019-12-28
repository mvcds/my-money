const assert = require('assert');
const { Given, When, Then } = require('cucumber')
const sinon = require('sinon');

const Projection = require('my-domain/entities/projection')
const EntryFactory = require('my-domain/entities/entry/entry.factory')

const CreateEntry = require('./index')

Given('an enabled entry with value {int}', function (value) {
  const projection = new Projection({ entries: [] })

  const presenter = {
    onStart: sinon.mock().once(),
    onError: sinon.mock().never(),
    onEnd: sinon.mock().once(),
  }

  this.world = {
    entry: EntryFactory.withValue(value).build({ isDisabled: false }),
    projection,
    presenter
  }
});

When('I create this entry', async function () {
  const { entry, projection, presenter } = this.world

  const uc = new CreateEntry(presenter)

  await uc.execute(projection, entry)
});

Then('a new {string} is added to the projection', function (direction) {
  const { entry, projection, presenter } = this.world

  assert.deepEqual(projection[direction], [entry])

  Object.values(presenter).forEach(mock => mock.verify())
});
