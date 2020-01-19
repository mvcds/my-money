import { decorate, observable, action } from 'mobx'
/* COLD BE IN BETTER PLACE??? */
import { NotificationManager } from 'react-notifications'

import CreateEntry from 'my-adapters/controllers/entry/create'

/* COLD BE IN BETTER PLACE??? */

class Application {
  isStarting: true;
  hasStartingFailure: false;

  constructor ({ storage, notifier, modules }) {
    this.storage = storage
    this.notifier = notifier

    this.start = this.start.bind(this)

    /* wrong */
    this.createEntry = new CreateEntry(this).create
    /* wrong */

    this.modules = modules.map(M => new M(this))
  }

  async start () {
    this.isStarting = true
    this.hasStartingFailure = false

    try {
      await this.storage.init()

      const starts = this.modules.map((m) => m.start())

      await Promise.all(starts)
    } catch (error) {
      this.hasStartingFailure = true

      console.log('error', error)
      // NotificationManager should not be here
      NotificationManager.error('Try again later', 'Initializing app failed', 5000)
    }

    this.isStarting = false
  }
}
decorate(Application, {
  isStarting: observable,
  hasStartingFailure: observable,
  start: action
})

export default Application
