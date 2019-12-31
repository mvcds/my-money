var fs = require('fs')

function readSiblingFolders () {
  return fs.readdirSync(__dirname)
    .reduce((all, item) => {
      const path = `${__dirname}/${item}`

      if (!fs.lstatSync(path).isDirectory()) {
        return all
      }

      return {
        ...all,
        [item]: require(path)
      }
    }, {})
}

const DEPENDENCIES = {
  storages: readSiblingFolders()
}

function Storage (containerForDrives, injection) {
  const { storages } = { ...DEPENDENCIES, ...injection }

  return {
    async init () {
      const substorages = await initSubstorages(containerForDrives, storages)

      substorages.forEach(linkWithSubstorage, this)
    }
  }
}

function initSubstorages (container, storages) {
  const substorages = Object.entries(storages).map(async ([storageName, Substorage]) => {
    const drive = container[storageName]

    if (!drive) {
      throw new Error(`A drive for ${storageName} was not found`)
    }

    const oldValues = await drive.readAll()

    return new Substorage(oldValues, { drive })
  })

  return Promise.all(substorages)
}

function linkWithSubstorage (substorage) {
  // TODO: prevent overwritte?
  Object.assign(this, substorage)

  // TODO: fix setters (and others)?
  Object.entries(Object.getOwnPropertyDescriptors(substorage))
    .filter(([key, descriptor]) => typeof descriptor.get === 'function')
    .forEach(([key, descriptor]) => Object.defineProperty(this, key, descriptor))
}

module.exports = Storage
