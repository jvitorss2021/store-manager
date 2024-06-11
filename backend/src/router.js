const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const validateProduct = require('./middlewares/validateProducts');

const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/products', validateProduct, productsController.create);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.deleteProduct);

router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getById);
router.post('/sales', salesController.create);
module.exports = router;  