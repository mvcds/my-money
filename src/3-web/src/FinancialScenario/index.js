import React from 'react';

import FixedValues from './fixed-values'

import './financial-scenario.css';

function FinancialScenario({ onCreateEntry = () => console.log('create') }) {
  return (
    <React.Fragment>
      <FixedValues />
      <button className="financial__create-button" onClick={onCreateEntry}>
        Create Random Entry
      </button>
    </React.Fragment>
  )
}

export default FinancialScenario
