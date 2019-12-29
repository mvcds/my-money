const DEPENDENCIES = {
  UseCase: require('my-use-cases/create-entry'),
  Presenter: require('my-adapters/presenters/create-entry')
}

function CreateEntryController (app, injection) {
  const { UseCase, Presenter } = { ...DEPENDENCIES, ...injection }

  const presenter = new Presenter('default', app.notifier)

  const uc = new UseCase(presenter, app.storage)

  Object.assign(this, {
    async create (entry) {
      presenter.onChangeValue(entry.value)
      presenter.onChangeSource(entry.source)

      await uc.execute()
    }
  })
}

module.exports = CreateEntryController
