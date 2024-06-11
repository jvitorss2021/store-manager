const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product; 
};

const create = async ({ name }) => {
  const insertId = await productsModel.create({ name });
  return { id: insertId, name };
};
const update = async (id, name) => {
  if (!name) {
    const error = new Error('"name" is required');
    error.status = 400;
    throw error;
  }

  if (name.length < 5) {
    const error = new Error('"name" length must be at least 5 characters long');
    error.status = 422;
    throw error;
  }

  const updatedProduct = await productsModel.update(id, name);
  if (!updatedProduct) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }

  return updatedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
