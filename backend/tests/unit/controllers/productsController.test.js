const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../src/app');
const { productById } = require('../mocks/productsMock');

const { expect } = chai;

chai.use(chaiHttp);

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
    expect(res.body).to.have.property('id', productById.id);
  });

  it('should return 404 if product not found', async function () {
    const res = await chai.request(app).get('/products/999');
    expect(res).to.have.status(404);
    expect(res.body).to.have.property('message', 'Product not found');
  });
});
