// test/services/productsService.test.js
const { expect } = require('chai');
const productsService = require('../../../src/services/productsService');
const { productsMock, productById } = require('../mocks/productsMock');

describe('Products Service', function () {
  it('should return all products', async function () {
    const products = await productsService.getAll();
    expect(products).to.deep.equal(productsMock);
  });

  it('should return a specific product by id', async function () {
    const product = await productsService.getById(1);
    expect(product).to.deep.equal(productById);
  });

  it('should throw an error if product not found', async function () {
    try {
      await productsService.getById(999);
    } catch (error) {
      expect(error).to.have.property('message', 'Product not found');
    }
  });
});
