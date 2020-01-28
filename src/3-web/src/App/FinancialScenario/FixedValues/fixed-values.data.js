import React from 'react'
import { observer } from 'mobx-react'
import store from 'my-web/src/Store'

import Component from './fixed-values.visual'

const FixedValuesData = observer(({ model }) => {
  return (
    <Component
      incoming={model.incoming}
      expenses={model.expenses}
      difference={model.difference}
      onCreateEntry={model.handleEntryCreation}
    />
  )
})

export default () => <FixedValuesData model={store.financialScenario} />
