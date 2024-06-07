// src/models/productsModel.js
const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products ORDER BY id ASC');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product[0];
};

module.exports = {
  getAll,
  getById,
};
