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
  const [scenario] = useState(data);

  return <Component scenario={scenario} onCreateEntry={() => console.log('create')} />
}

export default FinancialScenarioState
