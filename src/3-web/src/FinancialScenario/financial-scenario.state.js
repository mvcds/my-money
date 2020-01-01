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

function FinancialScenarioState() {
  const [scenario, setScenario] = useState(data);

  const onCreateEntry = () => {
    const copy = { ...scenario }
    const entry = {
      id: Date.now(),
      source: 'fake',
      value: Math.random() * 10,
      isDisabled: true,
      share: 0
    }

    const values = Math.random() > .5 ? copy.incoming : copy.expenses

    values.entries.push(entry)

    setScenario(copy)
  }

  return <Component scenario={scenario} onCreateEntry={onCreateEntry} />
}

export default FinancialScenarioState
