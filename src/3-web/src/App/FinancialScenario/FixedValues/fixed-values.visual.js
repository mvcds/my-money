import React from 'react'

const formarter = Intl && Intl.NumberFormat ? new Intl.NumberFormat() : {
  format: (x) => x.toLocaleString ? x.toLocaleString() : x.toFixed(2)
}

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
      {entries.map(Entry)}
      <tr>
        <th colSpan="3">{name}</th>
        <Money value={Math.abs(total)} />
      </tr>
    </React.Fragment>
  )
}

function Entry ({ id, source, value, isDisabled, share }) {
  return (
    <tr key={id}>
      <td>{source}</td>
      <Money value={Math.abs(value)} />
      <Percentage value={share} />
      <td>
        <input type="checkbox" checked={isDisabled} disabled />
      </td>
    </tr>
  )
}

function Percentage ({ value }) {
  if (Number.isNaN(value)) {
    return <Percentage value={0} />
  }

  const classes = ['financial__percentage']
  const percentage = parseInt((value * 100).toFixed(2), 10)

  if (value < 0) {
    classes.push('financial__percentage--negative')
  }

  return (
    <td className={classes.join(' ')}>
      {formarter.format(percentage)} %
    </td>
  )
}

function Money ({ value }) {
  if (Number.isNaN(value)) {
    return <Money value={0} />
  }

  const classes = ['financial__money']
  const money = formarter.format(Math.abs(value))
  const text = value >= 0 ? '$' : '($)'

  if (value < 0) {
    classes.push('financial__money--negative')
  }

  return (
    <td className={classes.join(' ')}>
      {text}{money}
    </td>
  )
}

export default FixedValues
