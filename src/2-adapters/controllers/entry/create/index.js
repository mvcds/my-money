const DEPENDENCIES = {
  UseCase: require('my-use-cases/create-entry')
}

function CreateEntryController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  Object.assign(this, {
    async create (presenter) {
      const uc = new UseCase(presenter, app.storage)

      await uc.execute()
    }
  })
}

module.exports = CreateEntryController
