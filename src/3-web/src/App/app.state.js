import React, { useState, useEffect } from 'react';

import Component from  './app.visual'

function AppState({ app }) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    init(app, () => {
      setLoading(false)
    }, () => {
      //TODO: make user aware, so they can retry to reload
    })
  }, [app]);

  return <Component isLoading={isLoading} />
}

async function init(app, onSuccess, onFailure) {
  try {
    await app.storage.init()
    await app.createEntry({})
    onSuccess()
  } catch(e) {
    console.log(e)
    onFailure()
  }
}

export default AppState
