import React, { useState } from 'react'

import FixedValues from './FixedValues'
import CreateEntryDialog from './CreateEntryDialog'

import './financial-scenario.css'

function FinancialScenario ({ isLoading }) {
  const [isCreating, setIsCreating] = useState(false)

  if (isLoading) {
    return <span>LOADING...</span>
  }

  return (
    <React.Fragment>
      <FixedValues />
      <button className="financial__create-button" onClick={() => setIsCreating(true)}>
        Create Entry
      </button>
      {isCreating && <CreateEntryDialog onClose={() => setIsCreating(false)} />}
    </React.Fragment>
  )
}

export default FinancialScenario
