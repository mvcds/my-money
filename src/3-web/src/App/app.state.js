import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

import Component from  './app.visual'

function AppState({ app }) {
  const [isLoading, setLoading] = useState(true);
  const [hasLoadingError, setLoadingError] = useState(false);

  const [projection, setProjection] = useState(null);

  useEffect(() => {
    init(app, () => {
      setLoading(false)
      setProjection(app.storage.projections[0]);
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
      projection={projection}
      onCreateEntry={app.createEntry}
      onReadScenario={app.readScenario}
    />
  )
}

async function init(app, onSuccess, onFailure) {
  try {
    await app.storage.init()

    if (!app.storage.projections.length) {
      await app.createProjection({
        projection: {
          title: 'Standard',
        },
        onStart: Function.prototype,
        onError: e => { throw e },
        onEnd: Function.prototype,
      })
    }

    onSuccess()
  } catch(e) {
    onFailure(e)
  }
}

export default AppState
