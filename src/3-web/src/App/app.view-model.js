import { decorate, observable, action } from "mobx"
import { NotificationManager } from 'react-notifications';

import CreateEntry from 'my-adapters/controllers/entry/create'
import CreateProjection from 'my-adapters/controllers/projection/create'
import ReadScenario from 'my-adapters/controllers/scenario/read'

class ViewModel {
  isLoading: true
  hasLoadingError: false
  projection: null

  constructor(storage, notifier) {
    this.storage = storage
    this.notifier = notifier

    this.createEntry = new CreateEntry(this).create
    this.readScenario = new ReadScenario(this).read
  }

  get isEmpty() {
    const { projections = [] } = this.storage

    return !projections.length
  }

  async init() {
    try {
      await this.storage.init()

      if (this.isEmpty) {
        await createFirstProjection.call(this)
      }

      onLoadSuccess.call(this)
    } catch (error) {
      onLoadFailure.call(this, error)
    }
  }
}
decorate(ViewModel, {
  isLoading: observable,
  hasLoadingError: observable,
  projection: observable,
  init: action
})

async function createFirstProjection() {
  const create = new CreateProjection(this).create

  await create({
    projection: {
      title: 'Standard',
    },
    onStart: Function.prototype,
    onError: e => { throw e },
    onEnd: Function.prototype,
  })
}

function onLoadSuccess() {
  this.isLoading = false
  this.hasLoadingError = false
  this.projection = this.storage.projections[0]
}

function onLoadFailure(error) {
  NotificationManager.error('Try again later', 'Initializing app failed', 5000);
  console.log(error)

  this.isLoading = false
  this.hasLoadingError = true
}

export default ViewModel
