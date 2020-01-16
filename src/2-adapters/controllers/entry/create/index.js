const DEPENDENCIES = {
  UseCase: require('my-use-cases/create-entry')
}

function CreateEntryController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  const uc = new UseCase(app.storage)

  Object.assign(this, {
    create: (presenter) => {
      try {
        if (!presenter.projectionId) {
          throw new Error('Projection has not id to be identified')
        }

        if (!presenter.entry) {
          throw new Error('Entry has not been defined')
        }

        /*
          take notice that even though it's technically possible to create an entry without source and value
          it's not of this controller's interest to allow so
        */
        if (!presenter.entry.source) {
          throw new Error('Entry cannot be created without a source')
        }

        if (!presenter.entry.value) {
          throw new Error('Entry cannot be created without a value')
        }
        /* end notice */

        return uc.create(presenter)
      } catch (error) {
        presenter.onError(error)
      }
    }
  })
}

module.exports = CreateEntryController
