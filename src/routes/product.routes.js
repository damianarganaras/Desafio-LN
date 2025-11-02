const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);
router.get('/:slug', productController.getProductBySlug);

module.exports = router;
