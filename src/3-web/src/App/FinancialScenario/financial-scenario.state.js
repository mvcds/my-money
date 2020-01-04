import React, { useState, useEffect } from 'react';
import { NotificationManager } from 'react-notifications';

import Component from  './financial-scenario.visual'

function FinancialScenarioState({ projection , onCreateEntry, onReadScenario }) {
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    if (!projection) return

    onReadScenario({
      onStart: Function.prototype,
      onError: (e) => console.log('scenario', e),
      onEnd: Function.prototype,
      onSuccess: setScenario,
      projectionId: projection.id
    })
  }, [onReadScenario, projection]);

  const handleCreation = async () => {
    const value = parseFloat((Math.random() * 10).toFixed(2))

    const trial = async () => {
      await onCreateEntry({
        onStart: Function.prototype,
        onError: (e) => {
          NotificationManager.error('Click here to retry', 'Creating entry failed', 5000, trial, true);
          console.log(e)
        },
        onEnd: Function.prototype,
        projectionId: projection.id,
        entry: {
          source: 'fake',
          value
        }
      })
    }

    trial()
  }

  return <Component scenario={scenario} onCreateEntry={handleCreation} />
}

export default FinancialScenarioState
