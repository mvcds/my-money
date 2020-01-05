const { random } = require('faker')
const sinon = require('sinon')

const Controller = require('./index')

describe('Create Projection Controller', function () {
  describe('#create', function () {
    let UseCase
    let uc
    before(async function () {
      const presenter = {
        title: random.uuid()
      }

      uc = {
        execute: sinon.mock().once('uc').withExactArgs(presenter)
      }

      UseCase = sinon.mock('UseCase').withExactArgs(sinon.match.any).returns(uc)

      const controller = new Controller({}, { UseCase })

      await controller.create(presenter)
    })

    it('Creates the use case', function () {
      UseCase.verify()
    })

    it('Executes the use case', function () {
      uc.execute.verify()
    })
  })
})