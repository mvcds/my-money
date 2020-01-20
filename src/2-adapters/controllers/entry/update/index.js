const DEPENDENCIES = {
  UseCase: require('my-use-cases/update-entry')
}

function UpdateEntryController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  const uc = new UseCase(app.storage)

  Object.assign(this, {
    update: (presenter) => {
      try {
        if (!presenter.entryId) {
          throw new Error('Entry has not id to be identified')
        }

        return uc.update(presenter)
      } catch (error) {
        presenter.onError(error)
      }
    }
  })
}

module.exports = UpdateEntryController
