import { decorate, observable, action } from 'mobx'
import { NotificationManager } from 'react-notifications'

import CreateProjection from 'my-adapters/controllers/projection/create'
import ReadScenario from 'my-adapters/controllers/scenario/read'
import CreateEntry from 'my-adapters/controllers/entry/create'
import UpdateEntry from 'my-adapters/controllers/entry/update'

class FinancialScenario {
  scenario: null;
  isLoading: true;

  constructor (app) {
    this.app = app

    const { create } = new CreateEntry(this.app)
    const { update } = new UpdateEntry(this.app)

    this.handleEntryCreation = this.handleEntryCreation.bind(this, create)
    this.handleToggleEntryDisabled = this.handleToggleEntryDisabled.bind(this, update)
  }

  get incoming () {
    return this.scenario ? this.scenario.incoming : {
      total: 0,
      entries: []
    }
  }

  get expenses () {
    return this.scenario ? this.scenario.expenses : {
      total: 0,
      entries: []
    }
  }

  get difference () {
    return this.scenario ? this.scenario.difference : 0
  }

  async start () {
    this.isLoading = true

    const projection = await readProjection.call(this)

    await readScenario.call(this, projection)

    this.isLoading = false
  }

  async handleEntryCreation (create, entry) {
    if (!this.scenario) return

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

      // TODO: use a better way to update
      await this.start()
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

    // TODO: use a better way to update
    await this.start()
  }
}
decorate(FinancialScenario, {
  scenario: observable,
  isLoading: observable,
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
