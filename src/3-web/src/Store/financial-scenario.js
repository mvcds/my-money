import { decorate, observable, action } from 'mobx'
import { NotificationManager } from 'react-notifications'

import CreateProjection from 'my-adapters/controllers/projection/create'
import ReadScenario from 'my-adapters/controllers/scenario/read'
import CreateEntry from 'my-adapters/controllers/entry/create'
import UpdateEntry from 'my-adapters/controllers/entry/update'

class FinancialScenario {
  scenario: null;

  constructor (app) {
    this.app = app

    const { create } = new CreateEntry(this.app)
    const { update } = new UpdateEntry(this.app)

    this.handleEntryCreation = this.handleEntryCreation.bind(this, create)
    this.handleToggleEntryDisabled = this.handleToggleEntryDisabled.bind(this, update)
  }

  async start () {
    const projection = await readProjection.call(this)

    await readScenario.call(this, projection)
  }

  async handleEntryCreation (create, entry) {
    if (!this.scenario) return

    const trial = async () => {
      const { projection } = await create({
        onStart: Function.prototype,
        onError: (e) => {
          NotificationManager.error('Click here to retry', 'Creating entry failed', 5000, trial, true)
          console.log(e)
        },
        onEnd: Function.prototype,
        projectionId: this.scenario.projectionId,
        entry
      })

      this.scenario = this.scenario.clone({ projection })
    }

    await trial()
  }

  async handleToggleEntryDisabled (update, entry) {
    await update({
      onStart: Function.prototype,
      onError: (e) => {
        NotificationManager.error('Toggling failed', 'Toggling failed failed', 5000)
        console.log(e)
      },
      onEnd: Function.prototype,
      entryId: entry.id,
      payload: {
        isDisabled: !entry.isDisabled
      }
    })

    this.scenario = this.scenario.clone()
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
