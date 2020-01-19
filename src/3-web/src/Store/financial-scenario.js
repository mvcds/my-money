import { decorate, observable, action } from 'mobx'
import { NotificationManager } from 'react-notifications'

import CreateProjection from 'my-adapters/controllers/projection/create'
import ReadScenario from 'my-adapters/controllers/scenario/read'
import CreateEntry from 'my-adapters/controllers/entry/create'

class FinancialScenario {
  scenario: null;

  constructor (app) {
    this.app = app

    this.handleEntryCreation = this.handleEntryCreation.bind(this)
  }

  async start () {
    const projection = await readProjection.call(this)

    await readScenario.call(this, projection)
  }

  async handleEntryCreation (entry) {
    if (!this.scenario) return

    const { create } = new CreateEntry(this.app)

    const trial = async () => {
      await create({
        onStart: Function.prototype,
        onError: (e) => {
          NotificationManager.error('Click here to retry', 'Creating entry failed', 5000, trial, true)
          console.log(e)
        },
        onEnd: Function.prototype,
        projectionId: this.scenario.projectionId,
        entry
      })
    }

    await trial()
  }
}
decorate(FinancialScenario, {
  scenario: observable,
  start: action,
  handleEntryCreation: action
})

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
  const { create } = new CreateProjection(this.app)

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
