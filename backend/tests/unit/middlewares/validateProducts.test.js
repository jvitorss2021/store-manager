const sinon = require('sinon');
const chai = require('chai');
const validateProduct = require('../../../src/middlewares/validateProducts');

const { expect } = chai;

describe('Middleware de Validação de Produto', function () {
  it('Deve retornar erro 400 se o campo "name" estiver ausente', function () {
    const req = { body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    validateProduct(req, res, next);

    expect(res.status.calledWith(400)).to.be.equals(true);
    expect(res.json.calledWith({ message: '"name" is required' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Deve retornar erro 422 se o campo "name" tiver menos de 5 caracteres', function () {
    const req = { body: { name: 'Abc' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    validateProduct(req, res, next);

    expect(res.status.calledWith(422)).to.be.equal(true);
    expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.equal(true);
    expect(next.called).to.be.equal(false);
  });

  it('Deve chamar next se o campo "name" for válido', function () {
    const req = { body: { name: 'Produto Válido' } };
    const res = {};
    const next = sinon.stub();

    validateProduct(req, res, next);

    expect(next.called).to.be.equal(true);
  }); 
});
