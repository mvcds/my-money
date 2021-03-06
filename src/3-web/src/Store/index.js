import Storage from './Storage'

import Application from './application'
import FinancialScenario from './financial-scenario'

const application = new Application({
  storage: Storage(),
  notifier: {
    onError (error) {
      console.log('error', error)
    }
  },
  modules: {
    financialScenario: FinancialScenario
  }
})

application.start()

const data = {
  application,
  financialScenario: application.modules.financialScenario
}

export default data
