import React, { useState } from 'react'
import { NotificationManager } from 'react-notifications'

import Component from './financial-scenario.visual'

function FinancialScenarioState ({ scenario, onCreateEntry, onReadScenario }) {
  const [isCreatingEntry, setCreatingEntry] = useState(false)

  const handleCreation = async (entry) => {
    if (!scenario) return

    const trial = async () => {
      await onCreateEntry({
        onStart: Function.prototype,
        onError: (e) => {
          NotificationManager.error('Click here to retry', 'Creating entry failed', 5000, trial, true)
          console.log(e)
        },
        onEnd: Function.prototype,
        projectionId: scenario.projection.id,
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
