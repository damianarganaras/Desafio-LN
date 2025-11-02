const express = require('express');
const orderController = require('../controllers/order.controller');
const createOrderDto = require('../dtos/create-order.dto');
const validateDto = require('../middleware/validation.middleware');

const router = express.Router();

/**
 * @openapi
 * /order:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Buscar pedidos
 *     description: Devuelve una lista de pedidos filtrados por ID, CUIT de cliente o rango de fechas.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID del pedido
 *       - in: query
 *         name: cuit
 *         schema:
 *           type: string
 *         description: CUIT del cliente
 *       - in: query
 *         name: created_at_min
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha mínima de circulación
 *       - in: query
 *         name: created_at_max
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Fecha máxima de circulación
 *     responses:
 *       200:
 *         description: Lista de pedidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', orderController.searchOrders);

/**
 * @openapi
 * /order:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Crear un nuevo pedido
 *     description: Crea un nuevo pedido, valida el stock y actualiza el inventario. Es transaccional.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               producto_id:
 *                 type: integer
 *               cliente_id:
 *                 type: integer
 *               cantidad_solicitada:
 *                 type: integer
 *             required:
 *               - producto_id
 *               - cliente_id
 *               - cantidad_solicitada
 *     responses:
 *       201:
 *         description: Pedido creado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Error de validación (Out of Stock o datos faltantes).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', validateDto(createOrderDto), orderController.createOrder);

module.exports = router;
