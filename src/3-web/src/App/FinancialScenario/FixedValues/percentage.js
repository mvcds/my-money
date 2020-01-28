import React from 'react'

import formarter from './formarter'

function Percentage ({ value }) {
  if (!Number.isFinite(value)) {
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

export default Percentage
