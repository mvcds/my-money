const { random } = require('faker')
const sinon = require('sinon')

const Controller = require('./index')

describe('Create Entry Controller', function () {
  describe('#create', function () {
    let presenter
    let uc
    before(async function () {
      const value = random.uuid()
      const source = random.uuid()

      presenter = {
        onChangeValue: sinon.mock('onChangeValue')
          .once()
          .withExactArgs(value),
        onChangeSource: sinon.mock('onChangeSource')
          .once()
          .withExactArgs(source),
        onStart: Function.prototype,
        onError: Function.prototype,
        onEnd: Function.prototype
      }
      uc = {
        execute: sinon.mock().once('uc').withExactArgs()
      }

      const controller = new Controller({}, {
        UseCase: sinon.stub().returns(uc),
        Presenter: sinon.stub().returns(presenter)
      })

      await controller.create({ value, source })
    })

    it('Changes the value', function () {
      presenter.onChangeValue.verify()
    })

    it('Changes the source', function () {
      presenter.onChangeSource.verify()
    })

    it('Executes the use case', function () {
      uc.execute.verify()
    })
  })
})
