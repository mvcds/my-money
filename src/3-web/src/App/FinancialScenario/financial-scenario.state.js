import React, { useState, useEffect } from 'react';

import Component from  './financial-scenario.visual'

function FinancialScenarioState({ onCreateEntry, onReadScenario }) {
  const [projectionId] = useState('default');
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    onReadScenario(projectionId)
      .then(setScenario)
      .catch(x => console.log(x))
  }, [onReadScenario, projectionId]);

  const handleCreation = async () => {
    const value = parseFloat((Math.random() * 10).toFixed(2))

    await onCreateEntry({
      onStart: () => console.log('creating...'),
      onError: (e) => console.log(e),
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
