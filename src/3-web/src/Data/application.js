import { decorate, observable, action } from 'mobx'
/* COLD BE IN BETTER PLACE??? */
import { NotificationManager } from 'react-notifications'
import Storage from 'my-web/src/Storage'
import CreateEntry from 'my-adapters/controllers/entry/create'
import CreateProjection from 'my-adapters/controllers/projection/create'
import ReadScenario from 'my-adapters/controllers/scenario/read'
/* COLD BE IN BETTER PLACE??? */

class Application {
  isStarting: true;
  hasStartingFailure: false;
  projection: null;

  constructor (storage = Storage()) {
    this.storage = storage
    this.notifier = this

    this.start = this.start.bind(this)

    /* wrong */
    this.createEntry = new CreateEntry(this).create
    this.readScenario = new ReadScenario(this).read
    /* wrong */
  }

  get isEmpty () {
    const { projections = [] } = this.storage

    return !projections.length
  }

  async start () {
    this.isStarting = true

    try {
      await this.storage.init()

      if (this.isEmpty) {
        await createFirstProjection.call(this)
      }

      onStartSucess.call(this)
    } catch (error) {
      onStartFailure.call(this, error)
    }

    this.isStarting = false
  }

  onError (error) {
    console.log('error', error)
  }
}
decorate(Application, {
  isStarting: observable,
  hasStartingFailure: observable,
  projection: observable,
  start: action
})

async function createFirstProjection () {
  const create = new CreateProjection(this).create

  await create({
    projection: {
      title: 'Standard'
    },
    onStart: Function.prototype,
    onError: e => { throw e },
    onEnd: Function.prototype
  })
}

function onStartSucess () {
  this.hasStartingFailure = false
  this.projection = this.storage.projections[0]
}

function onStartFailure (error) {
  this.hasStartingFailure = true

  // NotificationManager should not be here
  NotificationManager.error('Try again later', 'Initializing app failed', 5000)
  this.onError(error)
}

export default Application
