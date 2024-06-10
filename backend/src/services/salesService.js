const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sales = await salesModel.getById(id);
  return sales;
};
const create = async (products) => {
  const newSale = await salesModel.create(products);
  return newSale;
};

module.exports = {
  getAll,
  getById,
  create,
};
