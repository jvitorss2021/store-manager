// src/controllers/productsController.js
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

module.exports = {
  getAll,
  getById,
};
