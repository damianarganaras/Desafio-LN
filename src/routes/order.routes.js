const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

router.get('/', orderController.searchOrders);
router.post('/', orderController.createOrder);

module.exports = router;
