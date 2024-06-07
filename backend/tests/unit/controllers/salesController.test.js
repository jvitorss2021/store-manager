// test/controllers/salesController.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Sales Controller', function () {
  describe('GET /sales', function () {
    it('should return status 200', async function () {
      const res = await chai.request(app).get('/sales');
      expect(res).to.have.status(200);
    });

    it('should return an array with all sales', async function () {
      const res = await chai.request(app).get('/sales');
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.at.least(1); // Certifica-se de que há ao menos uma venda
    });

    it('should have the expected keys for all sales', async function () {
      const res = await chai.request(app).get('/sales');
      res.body.forEach((sale) => {
        expect(sale).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });

    it('should have the expected values for all sales', async function () {
      const res = await chai.request(app).get('/sales');
      // Verifique os valores com base nos dados conhecidos no seu banco de dados de teste
      if (res.body.length > 0) {
        expect(res.body[0]).to.have.property('saleId');
        expect(res.body[0]).to.have.property('date');
        expect(res.body[0]).to.have.property('productId');
        expect(res.body[0]).to.have.property('quantity');
      }
    });
  });

  describe('GET /sales/:id', function () {
    it('should return status 200', async function () {
      const res = await chai.request(app).get('/sales/1');
      expect(res).to.have.status(200);
    });

    it('should return an array with specific sale', async function () {
      const res = await chai.request(app).get('/sales/1');
      expect(res.body).to.be.an('array');
      expect(res.body.length).to.be.at.least(1); // Certifica-se de que há ao menos um item na venda específica
    });

    it('should have the expected keys for specific sale', async function () {
      const res = await chai.request(app).get('/sales/1');
      res.body.forEach((sale) => {
        expect(sale).to.include.all.keys('date', 'productId', 'quantity');
      });
    });

    it('should have the expected values for specific sale', async function () {
      const res = await chai.request(app).get('/sales/1');
      // Verifique os valores com base nos dados conhecidos no seu banco de dados de teste
      if (res.body.length > 0) {
        expect(res.body[0]).to.have.property('date');
        expect(res.body[0]).to.have.property('productId');
        expect(res.body[0]).to.have.property('quantity');
      }
    });

    it('should return 404 if sale not found', async function () {
      const res = await chai.request(app).get('/sales/999');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Sale not found');
    });
  });
});
