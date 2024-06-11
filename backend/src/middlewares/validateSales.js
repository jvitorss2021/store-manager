// middlewares/validateSales.js

const productsModel = require('../models/productsModel');

// Função para verificar a estrutura do payload
const validatePayloadStructure = (products) => {
  if (!Array.isArray(products)) {
    const error = new Error('Invalid payload');
    error.status = 400;
    throw error;
  }
};

// Função para validar campos individuais
const validateFields = (product) => {
  const { productId, quantity } = product;

  if (productId === undefined) {
    const error = new Error('"productId" is required');
    error.status = 400;
    throw error;
  }
  if (quantity === undefined) {
    const error = new Error('"quantity" is required');
    error.status = 400;
    throw error;
  }
  if (quantity <= 0) {
    const error = new Error('"quantity" must be greater than or equal to 1');
    error.status = 422;
    throw error;
  }
};

// Função para verificar a existência do produto
const checkProductExistence = async (productId) => {
  const productExists = await productsModel.getById(productId);
  if (!productExists) {
    const error = new Error('Product not found');
    error.status = 404;
    throw error;
  }
};
const validateSales = async (req, res, next) => {
  const products = req.body;

  try {
    // Verifica a estrutura do payload
    validatePayloadStructure(products);

    // Valida os campos de cada produto
    products.forEach(validateFields);

    // Verifica a existência dos produtos em paralelo
    await Promise.all(products.map((product) => checkProductExistence(product.productId)));

    next();
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
};

module.exports = validateSales;
