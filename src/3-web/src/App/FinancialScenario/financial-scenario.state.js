import React, { useState } from 'react';

import Component from  './financial-scenario.visual'

const data = {
  incoming: {
    entries: [],
    total: 0
  },
  expenses: {
    entries: [],
    total: 0
  },
  difference: 0
}

function FinancialScenarioState({ onCreateEntry }) {
  const [projectionId] = useState('default');
  const [scenario] = useState(data);

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
