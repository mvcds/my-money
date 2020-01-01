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
  },
  async readAll () {
    return []
  }
}
const projectionDrive = {
  async read () {
    return projection
  },
  async update () {
  },
  async readAll () {
    return []
  }
}

const app = {
  notifier: {
    onError: (msg) => console.log('error', msg)
  },
  storage: new Storage({
    entry: entryDrive,
    projection: projectionDrive
  })
}

/* Actual Proof */
app.storage.init().then(async () => {
  const controller = new CreateEntry(app)

  await controller.create({
    onStart: Function.prototype,
    onError: Function.prototype,
    onEnd: Function.prototype,
    projectionId: 'default',
    entry
  })

  console.log(app.storage.projections[0].incoming)
})
