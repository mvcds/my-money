import CreateProjection from 'my-adapters/controllers/projection/create'
import ReadScenario from 'my-adapters/controllers/scenario/read'

class FinancialScenario {
  scenario: null;

  constructor (app) {
    this.app = app
  }

  async start () {
    const projection = await readProjection.call(this)

    await readScenario.call(this, projection)
  }

  async handleEntryCreation (entry) {

  }
}

async function readProjection () {
  const { projections = [] } = this.app.storage

  const [existingProjection] = projections

  if (existingProjection) {
    return existingProjection
  }

  const { projection } = await createFirstProjection.call(this)

  return projection
}

async function readScenario (projection) {
  const { read } = new ReadScenario(this.app)

  const { scenario } = await read({
    onStart: Function.prototype,
    onError: (e) => console.log('scenario', e),
    onEnd: Function.prototype,
    onSuccess: Function.prototype,
    projectionId: projection.id
  })

  this.scenario = scenario
}

async function createFirstProjection () {
  const create = new CreateProjection(this.app).create

  return create({
    projection: {
      title: 'Standard'
    },
    onStart: Function.prototype,
    onError: e => { throw e },
    onEnd: Function.prototype
  })
}

export default FinancialScenario
