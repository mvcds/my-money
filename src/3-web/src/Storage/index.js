import Adapter from 'my-adapters/gateways/storage'

import entry from './entry'
import projection from './projection'

export default () => new Adapter({
  entry,
  projection
})
