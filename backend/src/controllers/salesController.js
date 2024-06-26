const salesService = require('../services/salesService');

const getAll = async (req, res) => {
  try {
    const sales = await salesService.getAll();
    res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    if (!sale || sale.length === 0) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const create = async (req, res, next) => {
  try {
    const products = req.body;
    
    const newSale = await salesService.create(products);
    return res.status(201).json(newSale);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
module.exports = {
  getAll,
  getById,
  create,
};
