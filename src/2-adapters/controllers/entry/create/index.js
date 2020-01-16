const DEPENDENCIES = {
  UseCase: require('my-use-cases/create-entry')
}

function CreateEntryController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  const uc = new UseCase(app.storage)

  Object.assign(this, {
    create: uc.create
  })
}

module.exports = CreateEntryController
