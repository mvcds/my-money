import React, { useEffect } from 'react'
import { observer } from 'mobx-react'

import Storage from 'my-web/src/Storage'
import ViewModel from 'my-web/src/Models/app'

import Component from './app.visual'

const AppData = observer(({ app }) => {
  useEffect(() => {
    app.init()
  }, [app])

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

const viewModel = new ViewModel(Storage, {
  onError: (msg) => console.log('error', msg)
})

export default () => <AppData app={viewModel} />
