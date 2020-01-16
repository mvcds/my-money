const { random } = require('faker')
const sinon = require('sinon')

const Controller = require('./index')

describe('Create Entry Controller', function () {
  describe('#create', function () {
    let UseCase
    let uc
    before(async function () {
      const presenter = {
        projectionId: random.uuid(),
        entry: {
          value: random.uuid(),
          source: random.uuid()
        },
        onError: Function.prototype
      }

      uc = {
        create: sinon.mock().once('uc').withExactArgs(presenter)
      }

      UseCase = sinon.mock('UseCase').withExactArgs(sinon.match.any).returns(uc)

      const controller = new Controller({}, { UseCase })

      await controller.create(presenter)
    })

    it('Creates the use case', function () {
      UseCase.verify()
    })

    it('Executes the use case', function () {
      uc.create.verify()
    })
  })
})
