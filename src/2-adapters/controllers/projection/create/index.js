const DEPENDENCIES = {
  UseCase: require('my-use-cases/create-projection')
}

function CreateProjectionController (app, injection) {
  const { UseCase } = { ...DEPENDENCIES, ...injection }

  const uc = new UseCase(app.storage)

  Object.assign(this, {
    create: (presenter) => {
      try {
        if (!presenter.projection) {
          throw new Error('Projection has not been defined')
        }

        /*
          take notice that even though it's technically possible to create a projection without title
          it's not of this controller's interest to allow so
        */
        if (!presenter.projection.title) {
          throw new Error('Projection cannot be created without a title')
        }
        /* end notice */

        return uc.create(presenter)
      } catch (error) {
        presenter.onError(error)
      }
    }
  })
}

module.exports = CreateProjectionController
