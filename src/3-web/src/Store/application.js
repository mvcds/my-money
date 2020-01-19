import { decorate, observable, action } from 'mobx'
import { NotificationManager } from 'react-notifications'

class Application {
  isStarting: true;
  hasStartingFailure: false;

  constructor ({ storage, notifier, modules }) {
    this.storage = storage
    this.notifier = notifier

    this.start = this.start.bind(this)

    this.modules = Object.entries(modules)
      .reduce((map, [key, Module]) => ({
        ...map,
        [key]: new Module(this)
      }), {})
  }

  async start () {
    this.isStarting = true
    this.hasStartingFailure = false

    try {
      await this.storage.init()

      const starts = Object.values(this.modules)
        .map((instance) => instance.start())

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
