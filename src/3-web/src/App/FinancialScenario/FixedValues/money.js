import React from 'react'

import formarter from './formarter'

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

export default Money
