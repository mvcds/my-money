import React from 'react'

import FixedValues from './FixedValues'
import CreateEntryDialog from './CreateEntryDialog'

import './financial-scenario.css'

function FinancialScenario ({
  scenario,
  isCreateEntryDialogOpen,
  onOpenCreateEntryDialog,
  onCloseCreateEntryDialog,
  onCreateEntry
}) {
  if (!scenario) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <FixedValues scenario={scenario} />
      <button className="financial__create-button" onClick={onOpenCreateEntryDialog}>
        Create Entry
      </button>
      {isCreateEntryDialogOpen && <CreateEntryDialog onClose={onCloseCreateEntryDialog} onCreateEntry={onCreateEntry} />}
    </React.Fragment>
  )
}

function Loading () {
  return (<span>LOADING...</span>)
}

export default FinancialScenario
