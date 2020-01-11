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
    this.createProjection = new CreateProjection(this).create

    this.onLoadSuccess = onLoadSuccess.bind(this)
    this.onLoadFailure = onLoadFailure.bind(this)
  }

  async init() {
    await this.storage.init()

    //  TODO: if (this.isEmpty) {
    if (!this.storage.projections.length) {
      await this.createProjection({
        projection: {
          title: 'Standard',
        },
        onStart: Function.prototype,
        onError: e => { throw e },
        onEnd: Function.prototype,
      })
    }
  }
}
decorate(ViewModel, {
  isLoading: observable,
  hasLoadingError: observable,
  projection: observable,
  init: action
})

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
