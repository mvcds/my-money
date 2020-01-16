const DEPENDENCIES = {
  UseCase: require('my-use-cases/create-projection')
}

function CreateProjectionController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  const uc = new UseCase(app.storage)

  Object.assign(this, {
    create: uc.create
  })
}

module.exports = CreateProjectionController
