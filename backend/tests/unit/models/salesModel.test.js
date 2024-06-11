const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const salesModel = require('../../../src/models/salesModel');

describe('Sales Model', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('getAll', function () {
    it('should return an array of all sales', async function () {
      const mockSales = [
        { saleId: 1, date: '2023-01-01', productId: 1, quantity: 10 },
        { saleId: 2, date: '2023-01-02', productId: 2, quantity: 5 },
      ];

      sinon.stub(connection, 'execute').resolves([mockSales]);

      const result = await salesModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.deep.equal(mockSales);
    });

    it('should handle an empty response', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await salesModel.getAll();
      const emptyArray = [];
      expect(result).to.deep.equal(emptyArray);
    });
  });

  describe('getById', function () {
    it('should return an array with the specific sale', async function () {
      const mockSale = [
        { date: '2023-01-01', productId: 1, quantity: 10 },
      ];

      sinon.stub(connection, 'execute').resolves([mockSale]);

      const result = await salesModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.deep.equal(mockSale);
    });

    it('should return an empty array if the sale does not exist', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await salesModel.getById(999);
      const emptyArray = [];
      expect(result).to.deep.equal(emptyArray);
    });

    it('should handle invalid id input gracefully', async function () {
      sinon.stub(connection, 'execute').resolves([[]]);

      const result = await salesModel.getById('invalid_id');
      const emptyArray = [];
      expect(result).to.deep.equal(emptyArray);
    });
  });

  describe('create', function () {
    it('should create a sale and return the sale id and items sold', async function () {
      const mockProducts = [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 5 },
      ];

      sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 1 }]) // Stub for sales table insert
        .onSecondCall()
        .resolves(); // Stub for sales_products table inserts

      const result = await salesModel.create(mockProducts);

      expect(result).to.deep.equal({
        id: 1,
        itemsSold: mockProducts,
      });
    });

    it('should handle errors during sale creation', async function () {
      const mockProducts = [
        { productId: 1, quantity: 10 },
        { productId: 2, quantity: 5 },
      ];

      sinon.stub(connection, 'execute')
        .onFirstCall().throws(new Error('Insert failed')); // Simulate a failure

      try {
        await salesModel.create(mockProducts);
      } catch (error) {
        expect(error.message).to.equal('Insert failed');
      }
    });

    it('should skip insertion for products with undefined productId or quantity', async function () {
      const mockProducts = [
        { productId: undefined, quantity: 10 },
        { productId: 2, quantity: undefined },
      ];

      const executeStub = sinon.stub(connection, 'execute')
        .onFirstCall().resolves([{ insertId: 1 }]) // Stub for sales table insert
        .onSecondCall()
        .resolves(); // Stub for sales_products table inserts

      const result = await salesModel.create(mockProducts);

      expect(result).to.deep.equal({
        id: 1,
        itemsSold: mockProducts,
      });
      expect(executeStub.callCount).to.equal(1); // Only the first call to 'sales' table
    });
  });
});
