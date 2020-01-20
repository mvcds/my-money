import React from 'react'

import Money from '../money'
import Percentage from '../percentage'

function Entry ({ id, source, value, isDisabled, share, onToggleDisabled }) {
  return (
    <tr>
      <td>{source}</td>
      <Money value={Math.abs(value)} />
      <Percentage value={share} />
      <td>
        <input type="checkbox" checked={isDisabled} onChange={() => onToggleDisabled({ id, isDisabled })} />
      </td>
    </tr>
  )
}

export default Entry
