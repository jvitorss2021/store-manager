const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product[0];
};  

const create = async (name) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return result.insertId;
};
const update = async (id, name) => {
  const [result] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?',
    [name, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return { id, name };
};
const deleteProduct = async (id) => {
  const [result] = await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return result.affectedRows;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteProduct,
};
