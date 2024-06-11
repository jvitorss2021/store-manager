const productsService = require('../services/productsService');

const getAll = async (req, res, next) => {
  try {
    const products = await productsService.getAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const create = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    const id = await productsService.create({ name });
    res.status(201).json(id);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedProduct = await productsService.update(Number(id), name);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await productsService.deleteProduct(Number(id));
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  getAll,
  getById,
  update,
  create,
  deleteProduct,
};
