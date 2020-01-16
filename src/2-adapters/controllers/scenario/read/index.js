const DEPENDENCIES = {
  UseCase: require('my-use-cases/read-scenario')
}

function ReadScenarioController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  const uc = new UseCase(app.storage)

  Object.assign(this, {
    read: (presenter) => {
      try {
        if (!presenter.projectionId) {
          throw new Error('Projection has not id to be identified')
        }

        return uc.read(presenter)
      } catch (error) {
        presenter.onError(error)
      }
    }
  })
}

module.exports = ReadScenarioController
