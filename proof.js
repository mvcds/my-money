//  if running `node proof.js` shows you an incoming array
//  with a single item which id is "fake"
//  then everything is working
const CreateEntry = require('my-adapters/controllers/entry/create')
const Storage = require('my-adapters/gateways/storage')

/* Some Data */
const entry = {
  value: 100,
  source: 'test'
}
const projection = {
  id: 'default',
  entries: []
}

/* Test Doubles */
const entryDrive = {
  async create () {
    entry.id = 'fake'
    return entry
  }
}
const projectionDrive = {
  async read () {
    return projection
  },
  async update () {
  }
}

const app = {
  notifier: {
    onError: (msg) => console.log('error', msg)
  },
  valuesOf (name) {
    if (name === 'ProjectionStorage') return { default: projection }
    return {}
  },
  driveOf (name) {
    if (name === 'EntryStorage') return entryDrive
    if (name === 'ProjectionStorage') return projectionDrive
    return {}
  }
}

/* Actual Proof */
const storage = new Storage(app)

app.storage = storage

const controller = new CreateEntry(app)

controller.create(entry).then(() => {
  console.log(storage.projections[0].incoming)
})
