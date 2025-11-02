const orderService = require('../services/order.service');

async function searchOrders(req, res, next) {
  try {
    const result = await orderService.searchOrders(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const result = await orderService.createOrder(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  searchOrders,
  createOrder
};
