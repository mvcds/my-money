import Storage  from 'my-adapters/gateways/storage'

import entry from './entry'
import projection from './projection'

const storage = new Storage({
  entry,
  projection
})

export default storage
