// tests/unit/middlewares/validateSales.test.js

const chai = require('chai');
const sinon = require('sinon');
const validateSales = require('../../../src/middlewares/validateSales');
const productsModel = require('../../../src/models/productsModel');

const { expect } = chai;

describe('Middleware validateSales', function () {
  it('should return 400 if productId is missing', async function () {
    const req = { body: [{ quantity: 1 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateSales(req, res, next);

    expect(res.status.calledWith(400)).to.be.equals(true);
    expect(res.json.calledWith({ message: '"productId" is required' })).to.be.equals(true);
  });

  it('should return 400 if quantity is missing', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateSales(req, res, next);

    expect(res.status.calledWith(400)).to.be.equals(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.be.equals(true);
  });

  it('should return 422 if quantity is less than or equal to 0', async function () {
    const req = { body: [{ productId: 1, quantity: 0 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await validateSales(req, res, next);

    expect(res.status.calledWith(422)).to.be.equals(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.be.equals(true);
  });

  it('should return 404 if productId does not exist', async function () {
    const req = { body: [{ productId: 999, quantity: 1 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    sinon.stub(productsModel, 'getById').resolves(null);

    await validateSales(req, res, next);

    expect(res.status.calledWith(404)).to.be.equals(true);
    expect(res.json.calledWith({ message: 'Product not found' })).to.be.equals(true);

    productsModel.getById.restore();
  });

  it('should call next if validation passes', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    sinon.stub(productsModel, 'getById').resolves({ id: 1 });

    await validateSales(req, res, next);

    expect(next.calledOnce).to.be.equals(true);

    productsModel.getById.restore();
  });
});
