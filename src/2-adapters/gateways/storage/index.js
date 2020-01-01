//  reading dynamically would prevent web apps from being developed =/
const DEPENDENCIES = {
  storages: {
    entry: require('./entry'),
    projection: require('./projection')
  }
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
