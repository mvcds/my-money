var fs = require('fs')

const storages = fs.readdirSync(__dirname)
  .map(item => `${__dirname}/${item}`)
  .filter(path => fs.lstatSync(path).isDirectory())
  .map(path => require(path))

const DEPENDENCIES = {
  storages
}

function Storage (app, injection) {
  const { storages } = { ...DEPENDENCIES, ...injection }

  storages.forEach((SubStorage) => {
    const oldValues = app.valuesOf(SubStorage.name)
    const drive = app.driveOf(SubStorage.name)

    const storage = new SubStorage(oldValues, { drive })

    // TODO: prevent overwritte?
    Object.assign(this, storage)

    const properties = Object.entries(Object.getOwnPropertyDescriptors(storage))
      .filter(([key, descriptor]) => typeof descriptor.get === 'function')

    for (var [key, descriptor] of properties) {
      Object.defineProperty(this, key, descriptor)
    }
  })
}

module.exports = Storage
