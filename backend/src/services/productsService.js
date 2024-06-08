// productService.js

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

module.exports = {
  getAll,
  getById,
  create,
};
