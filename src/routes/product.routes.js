const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

/**
 * @openapi
 * /product:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener lista de productos filtrados
 *     description: Devuelve una lista paginada de productos que cumplen con los criterios de disponibilidad (stock > 0, estado = 3, con imagen y precio > 0).
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: fecha_creacion
 *           enum: [fecha_creacion, precio, categoria]
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *         description: Dirección del ordenamiento
 *     responses:
 *       200:
 *         description: Lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', productController.getProducts);

/**
 * @openapi
 * /product/search:
 *   get:
 *     tags:
 *       - Products
 *     summary: Buscar productos en el catálogo
 *     description: Búsqueda general por SKU, descripción corta o larga. No filtra por disponibilidad.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: fecha_creacion
 *           enum: [fecha_creacion, precio, categoria]
 *         description: Campo por el cual ordenar
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           default: DESC
 *           enum: [ASC, DESC]
 *         description: Dirección del ordenamiento
 *     responses:
 *       200:
 *         description: Lista de productos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Error del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/search', productController.searchProducts);

/**
 * @openapi
 * /product/{slug}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Obtener detalle de un producto por slug
 *     description: Busca un producto por su 'slug' (ej. 'hola-argentina-ed.373') y devuelve sus detalles y productos relacionados.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug del producto
 *     responses:
 *       200:
 *         description: Detalle del producto.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *                 relatedProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
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
router.get('/:slug', productController.getProductBySlug);

module.exports = router;
