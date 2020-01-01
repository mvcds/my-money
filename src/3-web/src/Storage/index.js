import Storage  from 'my-adapters/gateways/storage'

export default new Storage({
  entry: {
    async create () {
      throw new Error('Not implemented yet')
    },
    async readAll () {
      const entries = localStorage.getItem('my-money:data:entries') || '{}'

      return JSON.parse(entries)
    }
  },
  projection: {
    async read () {
      throw new Error('Not implemented yet')
    },
    async update () {
      throw new Error('Not implemented yet')
    },
    async readAll () {
      const projections = localStorage.getItem('my-money:data:projections') || '{}'

      return JSON.parse(projections)
    }
  }
})
