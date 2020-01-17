import React from 'react'
import { observer } from 'mobx-react'

import Component from './app.visual'

const AppData = observer(({ app }) => {
  return (
    <Component
      isLoading={app.isLoading}
      hasLoadingError={app.hasLoadingError}
      projection={app.projection}
      onCreateEntry={app.createEntry}
      onReadScenario={app.readScenario}
    />
  )
})

export default ({ application }) => <AppData app={application} />
