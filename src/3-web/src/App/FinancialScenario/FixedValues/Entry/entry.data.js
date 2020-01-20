import React from 'react'
import { observer } from 'mobx-react'
import store from 'my-web/src/Store'

import Component from './entry.visual'

const EntryData = observer(({ model, ...props }) => {
  return (
    <Component
      {...props}
      onToggleDisabled={model.handleToggleEntryDisabled}
    />
  )
})

export default (props) => <EntryData model={store.financialScenario} {...props} />
