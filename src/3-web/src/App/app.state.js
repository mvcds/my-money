import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

import Component from  './app.visual'

function AppState({ app }) {
  const [isLoading, setLoading] = useState(true);
  const [hasLoadingError, setLoadingError] = useState(false);

  useEffect(() => {
    init(app, () => {
      setLoading(false)
    }, (e) => {
      NotificationManager.error('Try again later', 'Initializing app failed', 5000);
      console.log(e)
      setLoadingError(true)
      setLoading(false)
    })
  }, [app]);

  return (
    <Component
      isLoading={isLoading}
      hasLoadingError={hasLoadingError}
      onCreateEntry={app.createEntry}
      onReadScenario={app.readScenario}
    />
  )
}

async function init(app, onSuccess, onFailure) {
  try {
    await app.storage.init()
    onSuccess()
  } catch(e) {
    onFailure(e)
  }
}

export default AppState
