import React from 'react';

import FixedValues from './fixed-values'

import './financial-scenario.css';

function FinancialScenario({ scenario, onCreateEntry }) {
  if (!scenario) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <FixedValues scenario={scenario} />
      <button className="financial__create-button" onClick={onCreateEntry}>
        Create Random Entry
      </button>
    </React.Fragment>
  )
}

function Loading() {
  return (<span>LOADING...</span>)
}


export default FinancialScenario
