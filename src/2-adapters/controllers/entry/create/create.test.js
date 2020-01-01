const { random } = require('faker')
const sinon = require('sinon')

const Controller = require('./index')

describe('Create Entry Controller', function () {
  describe('#create', function () {
    let UseCase
    let uc
    before(async function () {
      const presenter = {
        value: random.uuid,
        source: random.uuid
      }
      uc = {
        execute: sinon.mock().once('uc').withExactArgs()
      }

      UseCase = sinon.mock('UseCase').withExactArgs(presenter, sinon.match.any).returns(uc)

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
