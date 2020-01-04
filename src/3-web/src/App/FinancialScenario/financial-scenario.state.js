import React, { useState, useEffect } from 'react';

import Component from  './financial-scenario.visual'

function FinancialScenarioState({ onCreateEntry, onReadScenario }) {
  const [projectionId] = useState('default');
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    onReadScenario({
      onStart: () => console.log('scenario?'),
      onError: (e) => console.log('scenario', e),
      onEnd: () => console.log('scenario!'),
      onSuccess: setScenario,
      projectionId
    })
  }, [onReadScenario, projectionId]);

  const handleCreation = async () => {
    const value = parseFloat((Math.random() * 10).toFixed(2))

    await onCreateEntry({
      onStart: () => console.log('creating...'),
      onError: (e) => console.log('creating', e),
      onEnd: () => console.log('created!'),
      projectionId,
      entry: {
        source: 'fake',
        value
      }
    })
  }

  return <Component scenario={scenario} onCreateEntry={handleCreation} />
}

export default FinancialScenarioState
