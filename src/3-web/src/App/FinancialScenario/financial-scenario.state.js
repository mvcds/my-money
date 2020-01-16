import React, { useState, useEffect } from 'react'
import { NotificationManager } from 'react-notifications'

import Component from './financial-scenario.visual'

function FinancialScenarioState ({ projection, onCreateEntry, onReadScenario }) {
  const [scenario, setScenario] = useState(null)

  const [isCreatingEntry, setCreatingEntry] = useState(false)

  useEffect(() => {
    if (!projection) return

    onReadScenario({
      onStart: Function.prototype,
      onError: (e) => console.log('scenario', e),
      onEnd: Function.prototype,
      onSuccess: setScenario,
      projectionId: projection.id
    })
  }, [onReadScenario, projection])

  const handleCreation = async (entry) => {
    const trial = async () => {
      await onCreateEntry({
        onStart: Function.prototype,
        onError: (e) => {
          NotificationManager.error('Click here to retry', 'Creating entry failed', 5000, trial, true)
          console.log(e)
        },
        onEnd: Function.prototype,
        projectionId: projection.id,
        entry
      })
    }

    await trial()
  }

  return (
    <Component
      scenario={scenario}
      isCreatingEntry={isCreatingEntry}
      onOpenCreateEntryDialog={() => setCreatingEntry(true)}
      onCloseCreateEntryDialog={() => setCreatingEntry(false)}
      onCreateEntry={handleCreation}
    />
  )
}

export default FinancialScenarioState
