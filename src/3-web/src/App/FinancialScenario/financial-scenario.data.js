import React, { useState } from 'react'
import { observer } from 'mobx-react'
import store from 'my-web/src/Store'

import Component from './financial-scenario.visual'

const FinancialScenarioData = observer(({ model }) => {
  const [isCreateEntryDialogOpen, setCreateEntryDialogOpen] = useState(false)

  return (
    <Component
      scenario={model.scenario}
      isCreateEntryDialogOpen={isCreateEntryDialogOpen}
      onOpenCreateEntryDialog={() => setCreateEntryDialogOpen(true)}
      onCloseCreateEntryDialog={() => setCreateEntryDialogOpen(false)}
      onCreateEntry={model.handleEntryCreation}
    />
  )
})

export default () => <FinancialScenarioData model={store.financialScenario} />
