const NOTIFIER = {
  onMessage: Function.prototype,
  onError: Function.prototype
}

function CreateEntryPresenter (projectionId, notifier) {
  const logger = { ...NOTIFIER, ...notifier }
  const internal = {
    hasStarted: false,
    entry: {
      source: '',
      value: 0
    }
  }

  Object.assign(this, {
    projectionId,
    onStart () {
      if (internal.hasStarted) throw new Error('The presenter is already creating an entry')

      internal.hasStarted = true
      logger.onMessage('Starts creating an entry')
    },
    onError ({ message }) {
      logger.onError(message)
    },
    onEnd () {
      if (!internal.hasStarted) throw new Error('The presenter is not creating an entry')

      internal.hasStarted = false
      logger.onMessage('Ends creating an entry')
    },
    onChangeValue (value) {
      //  knows how to validate value?
      internal.entry.value = value
    },
    onChangeSource (source) {
      //  knows how to validate source?
      internal.entry.source = source
    }
  })

  Object.defineProperty(this, 'hasStarted', {
    get () {
      return internal.hasStarted
    }
  })

  Object.defineProperty(this, 'entry', {
    get () {
      return internal.entry
    }
  })
}

module.exports = CreateEntryPresenter
