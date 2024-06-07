// src/models/salesModel.js

const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
    SELECT sp.sale_id as saleId, s.date, sp.product_id as productId, sp.quantity
    FROM sales AS s
    JOIN sales_products AS sp ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;
  `);
  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute(`
    SELECT s.date, sp.product_id as productId, sp.quantity
    FROM sales AS s
    JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    ORDER BY sp.product_id;
  `, [id]);
  return sales;
};

module.exports = {
  getAll,
  getById,
};
