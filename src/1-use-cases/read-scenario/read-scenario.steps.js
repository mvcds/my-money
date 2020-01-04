const { Given, When } = require('cucumber')
const { random } = require('faker')
const sinon = require('sinon')

const ReadScenario = require('./index')

Given('the scenario the projection {string}', function (value) {
  const key = 'presenter.projectionId'.split('.')

  setValue(this.world, key, value)
})

// TODO: move this function to a common place
function setValue (object, [key, nextKey, ...rest], value) {
  if (rest.length > 0) {
    return setValue(object[key], [nextKey, ...rest], value)
  }
  object[key] = Object.assign({}, object[key], { [nextKey]: value })
}

Given('a {string} is a known scenario', function (id) {
  const { presenter, storage, injection } = this.world

  const projection = {
    id,
    entries: []
  }

  const scenario = random.uuid()

  presenter.projectionId = projection.id
  presenter.onStart = Function.prototype
  presenter.onError = sinon.mock('onError').never()
  presenter.onEnd = Function.prototype
  presenter.onSuccess = sinon.mock('onSuccess').once()

  storage.readProjectionById = sinon.mock('readProjectionById')
    .once()
    .withExactArgs(projection.id)
    .resolves(projection)

  injection.Scenario = sinon.mock('Scenario')
    .once()
    .withExactArgs({ projection })
    .returns(scenario)
  injection.Projection = sinon.mock('Projection')
    .once()
    .returns(projection)
})

When('I read the scenario', async function () {
  const { presenter, storage, injection } = this.world

  const uc = new ReadScenario(storage, injection)

  await uc.execute(presenter)
})
