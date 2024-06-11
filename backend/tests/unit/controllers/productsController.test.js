const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');

const { expect } = chai;

chai.use(chaiHttp);

describe('Products API', function () {
  describe('GET /products', function () {
    it('should list all products', async function () {
      const res = await chai.request(app).get('/products');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('should list a specific product', async function () {
      const res = await chai.request(app).get('/products/1');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
    });

    it('should return 404 if product not found', async function () {
      const res = await chai.request(app).get('/products/999');
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Product not found');
    });
  });

  describe('POST /products', function () {
    it('should create a new product', async function () {
      const res = await chai.request(app)
        .post('/products')
        .send({ name: 'ProdutoX' });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('name', 'ProdutoX');
    });

    it('should return 400 if name is missing', async function () {
      const res = await chai.request(app)
        .post('/products')
        .send({});
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', '"name" is required');
    });
  });
  describe('PUT /products/:id', function () {
    beforeEach(async function () {
      await chai.request(app)
        .post('/products')
        .send({ name: 'Produto Inicial' });
    });

    it('should update a product successfully', async function () {
      const res = await chai.request(app)
        .put('/products/1')
        .send({ name: 'Produto Atualizado' });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id', 1);
      expect(res.body).to.have.property('name', 'Produto Atualizado');
    });

    it('should return 400 if name is missing', async function () {
      const res = await chai.request(app)
        .put('/products/1')
        .send({});
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('message', '"name" is required');
    });

    it('should return 422 if name is too short', async function () {
      const res = await chai.request(app)
        .put('/products/1')
        .send({ name: 'abc' });
      expect(res).to.have.status(422);
      expect(res.body).to.have.property('message', '"name" length must be at least 5 characters long');
    });

    it('should return 404 if product not found', async function () {
      const res = await chai.request(app)
        .put('/products/999')
        .send({ name: 'Produto Atualizado' });
      expect(res).to.have.status(404);
      expect(res.body).to.have.property('message', 'Product not found');
    });
  });
});
