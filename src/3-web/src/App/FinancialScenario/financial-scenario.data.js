import React from 'react'
import { observer } from 'mobx-react'
import store from 'my-web/src/Store'

import Component from './financial-scenario.visual'

const FinancialScenarioData = observer(({ model }) => <Component isLoading={model.isLoading} />)

export default () => <FinancialScenarioData model={store.financialScenario} />
