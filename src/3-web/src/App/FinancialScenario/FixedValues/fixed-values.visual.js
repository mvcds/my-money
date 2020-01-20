import React from 'react'

import Money from './money'
import Percentage from './percentage'
import Entry from './Entry'

function FixedValues ({ scenario }) {
  return (
    <table className="financial__values">
      <thead>
        <tr>
          <th colSpan="4">Fixed Values</th>
        </tr>
        <tr>
          <th>Source</th>
          <th>Value</th>
          <th>Share</th>
          <th>Disabled?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan="4">Incoming</th>
        </tr>
        <Group entries={scenario.incoming} name="In" />
      </tbody>
      <tbody>
        <tr>
          <th colSpan="4">Expenses</th>
        </tr>
        <Group entries={scenario.expenses} name="Out" />
      </tbody>
      <tfoot>
        <tr>
          <th colSpan="2">Yours</th>
          <Money value={scenario.difference} />
          <Percentage value={scenario.difference / scenario.incoming.total} />
        </tr>
      </tfoot>
    </table>
  )
}

function Group ({ entries: { entries, total }, name }) {
  return (
    <React.Fragment>
      {entries.map((entry) => <Entry key={entry.id} {...entry} />)}
      <tr>
        <th colSpan="3">{name}</th>
        <Money value={Math.abs(total)} />
      </tr>
    </React.Fragment>
  )
}

export default FixedValues
