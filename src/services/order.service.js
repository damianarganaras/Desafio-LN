const getPool = require('../config/database');
const orderRepository = require('../repositories/order.repository');
const productRepository = require('../repositories/product.repository');
const { ValidationError, NotFoundError } = require('../utils/errors');

async function searchOrders(filters) {
  const result = await orderRepository.search(filters);
  return result;
}

async function createOrder(orderData) {
  const pool = getPool();
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const { producto_id, cliente_id, cantidad_solicitada } = orderData;

    if (!producto_id || !cliente_id || !cantidad_solicitada) {
      throw new ValidationError('Faltan datos en el pedido.');
    }

    const product = await productRepository.findById(producto_id, connection);

    if (!product) {
      throw new NotFoundError('El producto no existe.');
    }

    if (product.qty <= 0 || product.qty < cantidad_solicitada) {
      throw new ValidationError('Out of Stock');
    }

    const newStock = product.qty - cantidad_solicitada;
    await productRepository.updateStock(producto_id, newStock, connection);

    const newOrderData = {
      producto_id,
      cliente_id,
      cantidad_solicitada,
      precio: orderData.precio || 0,
      fecha_circulacion: new Date(),
      clase_entrega: orderData.clase_entrega || 'ASG',
      condicion_pago_aplicada: orderData.condicion_pago_aplicada || 'FAC',
      id_cliente: orderData.id_cliente || cliente_id.toString()
    };

    const result = await orderRepository.create(newOrderData, connection);
    const insertId = result.insertId;

    await connection.commit();

    return { id: insertId, ...newOrderData };
  } catch (error) {
    if (connection) await connection.rollback();
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  searchOrders,
  createOrder
};
