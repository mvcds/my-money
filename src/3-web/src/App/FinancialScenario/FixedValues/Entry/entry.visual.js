import React from 'react'

import Money from '../money'
import Percentage from '../percentage'

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

export default Entry
