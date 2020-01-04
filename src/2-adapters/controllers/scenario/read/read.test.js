const { random } = require('faker')
const sinon = require('sinon')

const Controller = require('./index')

describe('Read Scenario Controller', function () {
  describe('#read', function () {
    let UseCase
    let uc
    before(async function () {
      const presenter = {
        projectionId: random.uuid()
      }

      uc = {
        execute: sinon.mock().once('uc').withExactArgs(presenter)
      }

      UseCase = sinon.mock('UseCase').withExactArgs(sinon.match.any).returns(uc)

      const controller = new Controller({}, { UseCase })

      await controller.read(presenter)
    })

    it('Creates the use case', function () {
      UseCase.verify()
    })

    it('Executes the use case', function () {
      uc.execute.verify()
    })
  })
})
