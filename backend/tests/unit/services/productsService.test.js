const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');
const { productById } = require('../mocks/productsMock');

describe('Products Service', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('should return a specific product by id', async function () {
    sinon.stub(productsModel, 'getById').resolves(productById);
    const product = await productsService.getById(1);
    expect(product).to.deep.equal(productById);
  });

  it('should throw an error if product not found', async function () {
    sinon.stub(productsModel, 'getById').resolves(null);
    try {
      await productsService.getById(999);
    } catch (error) {
      expect(error).to.have.property('message', 'Product not found');
    }
  });

  describe('update', function () {
    beforeEach(function () {
      sinon.stub(productsModel, 'getById').resolves(productById);
    });

    it('should update a product successfully', async function () {
      const updatedProduct = { id: 1, name: 'Produto Atualizado' };
      sinon.stub(productsModel, 'update').resolves(updatedProduct);

      const product = await productsService.update(1, 'Produto Atualizado');
      expect(product).to.deep.equal(updatedProduct);
    });

    it('should throw an error if name is missing', async function () {
      try {
        await productsService.update(1, '');
      } catch (error) {
        expect(error).to.have.property('message', '"name" is required');
        expect(error).to.have.property('status', 400);
      }
    });

    it('should throw an error if name is too short', async function () {
      try {
        await productsService.update(1, 'abc');
      } catch (error) {
        expect(error).to.have.property('message', '"name" length must be at least 5 characters long');
        expect(error).to.have.property('status', 422);
      }
    });
  });
  describe('deleteProduct', function () {
    it('should delete a product successfully', async function () {
      sinon.stub(productsModel, 'delete').resolves(1);
      await productsService.deleteProduct(1);
    });

    it('should throw an error if product not found', async function () {
      sinon.stub(productsModel, 'delete').resolves(0);
      try {
        await productsService.deleteProduct(999);
      } catch (error) {
        expect(error).to.have.property('message', 'Product not found');
        expect(error).to.have.property('status', 404);
      }
    });
  });
});
