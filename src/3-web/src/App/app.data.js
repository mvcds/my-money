import React from 'react'
import { observer } from 'mobx-react'
import store from 'my-web/src/Store'

import Component from './app.visual'

const AppData = observer(({ app }) => {
  return (
    <Component
      isLoading={app.isStarting}
      hasLoadingError={app.hasStartingFailure}
    />
  )
})

export default () => <AppData app={store.application} />
