import React, { useEffect } from "react"
import { observer } from "mobx-react"

import Storage from '../Storage'

import Component from './app.visual'
import ViewModel from './app.view-model'

const AppData = observer(({ app }) => {
  useEffect(() => {
    app.init()
      .then(app.onLoadSuccess)
      .catch(app.onLoadFailure)
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
