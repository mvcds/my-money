import React from 'react'

import Money from './money'
import Percentage from './percentage'
import Entry from './Entry'

function FixedValues ({ incoming, expenses, difference }) {
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
        <Group entries={incoming} name="In" />
      </tbody>
      <tbody>
        <tr>
          <th colSpan="4">Expenses</th>
        </tr>
        <Group entries={expenses} name="Out" />
      </tbody>
      <tfoot>
        <tr>
          <th colSpan="2">Yours</th>
          <Money value={difference} />
          <Percentage value={difference / incoming.total} />
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
