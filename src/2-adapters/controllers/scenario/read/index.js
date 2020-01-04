const DEPENDENCIES = {
  UseCase: require('my-use-cases/read-scenario')
}

function ReadScenarioController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  const uc = new UseCase(app.storage)

  Object.assign(this, {
    read: uc.execute
  })
}

module.exports = ReadScenarioController
