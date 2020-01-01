import React from 'react';

const data = {
  incoming: {
    entries: [
      { id: 1, source: 'one', value: 10, isDisabled: false, share: 1/4 },
      { id: 2, source: 'two', value: 20, isDisabled: true, share: 0 },
      { id: 3, source: 'three', value: 30, isDisabled: false, share: 3/4 },
    ],
    total: 40
  },
  expenses: {
    entries: [
      { id: 4, source: 'cheap', value: -1, isDisabled: false, share: 1/17 },
      { id: 5, source: 'unnecessary', value: -4, isDisabled: true, share: 0 },
      { id: 7, source: 'expensive', value: -16, isDisabled: false, share: 16/17 },
    ],
    total: 17
  },
  difference: 23
}

function FixedValues({ scenario = data }) {
  return (
    <table>
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
          <td>${scenario.difference}</td>
          <Percentage value={scenario.difference / scenario.incoming.total} />
        </tr>
      </tfoot>
    </table>
  )
}

function Group({ entries: { entries, total }, name }) {
  return (
    <React.Fragment>
      {entries.map(Entry)}
      <tr>
        <th colSpan="3">{name}</th>
        <td>${Math.abs(total)}</td>
      </tr>
    </React.Fragment>
  )
}

function Entry({ id, source, value, isDisabled, share }) {
  return (
    <tr key={id}>
      <td>{source}</td>
      <td>${Math.abs(value)}</td>
      <Percentage value={share} />
      <td>
        <input type="checkbox" checked={isDisabled} disabled />
      </td>
    </tr>
  )
}

function Percentage({ value }) {
  return (
    <td>
      {parseInt((value * 100).toFixed(2), 10)} %
    </td>
  )
}

export default FixedValues
