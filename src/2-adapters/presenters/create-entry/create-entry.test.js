const assert = require('assert')
const sinon = require('sinon')
const { random } = require('faker')

const Presenter = require('./index')

describe('Create Entry Presenter', function () {
  describe('Initial state', function () {
    let presenter
    let projectionId

    before(function () {
      projectionId = random.uuid()

      presenter = new Presenter(projectionId)
    })

    it('Has not started yet', function () {
      assert.equal(presenter.hasStarted, false)
    })

    it('Has the initial projectionId', function () {
      assert.equal(presenter.projectionId, projectionId)
    })

    it('Has an empty source', function () {
      assert.equal(presenter.entry.source, '')
    })

    it('Has an neutral value', function () {
      assert.equal(presenter.entry.value, 0)
    })
  })

  describe('Changing values', function () {
    describe("Projection's ID", function () {
      it('Changes projectionId', function () {
        const projectionId = random.uuid()
        const presenter = new Presenter(null)

        presenter.projectionId = projectionId

        assert.equal(presenter.projectionId, projectionId)
      })
    })

    describe("Entry's value", function () {
      it('Changes the value', function () {
        const value = random.uuid()
        const presenter = new Presenter()

        presenter.onChangeValue(value)

        assert.equal(presenter.entry.value, value)
      })
    })

    describe("Entry's source", function () {
      it('Changes the souce', function () {
        const source = random.uuid()
        const presenter = new Presenter()

        presenter.onChangeSource(source)

        assert.equal(presenter.entry.source, source)
      })
    })
  })

  describe('#onStart', function () {
    describe('Not started', function () {
      it('Starts creating', function () {
        const presenter = new Presenter()

        presenter.onStart()

        assert.equal(presenter.hasStarted, true)
      })
    })

    describe('Already started', function () {
      it('Throws for already started operation', function () {
        const presenter = new Presenter()

        presenter.onStart()

        assert.throws(() => presenter.onStart(), /The presenter is already creating an entry/)
      })
    })
  })

  describe('#onError', function () {
    it('Notifies about the error', function () {
      const message = random.uuid()

      const notifier = {
        onError: sinon.mock()
          .once()
          .withExactArgs(message)
      }

      const presenter = new Presenter(null, notifier)

      presenter.onError({ message })

      notifier.onError.verify()
    })
  })

  describe('#onEnd', function () {
    describe('Not started', function () {
      it('Throws for non-started operation', function () {
        const presenter = new Presenter()

        assert.throws(() => presenter.onEnd(), /The presenter is not creating an entry/)
      })
    })

    describe('Already started', function () {
      it('Ends creating', function () {
        const presenter = new Presenter()

        presenter.onStart()
        presenter.onEnd()

        assert.equal(presenter.hasStarted, false)
      })
    })
  })
})
