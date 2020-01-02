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
    await onCreateEntry({
      onStart: () => console.log('creating...'),
      onError: (e) => console.log(e),
      onEnd: () => console.log('created!'),
      projectionId,
      entry: {
        source: 'fake',
        value: Math.random() * 10
      }
    })
  }

  return <Component scenario={scenario} onCreateEntry={handleCreation} />
}

export default FinancialScenarioState
