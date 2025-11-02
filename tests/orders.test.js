const request = require('supertest');
const app = require('../src/app');
const getPool = require('../src/config/database');

describe('POST /order', () => {
  it('debería devolver 400 si faltan datos (DTO)', async () => {
    const res = await request(app)
      .post('/order')
      .send({ cliente_id: 1, cantidad_solicitada: 1 });

    expect(res.statusCode).toBe(400);
    expect(res.body.description).toContain("El campo 'producto_id' es requerido");
  });

  it('debería devolver 404 si el producto no existe', async () => {
    const body = {
      producto_id: 99999,
      cliente_id: 1,
      cantidad_solicitada: 1
    };

    const res = await request(app)
      .post('/order')
      .send(body);

    expect(res.statusCode).toBe(404);
    expect(res.body.description).toBe('El producto no existe.');
  });

  it('debería devolver 400 si no hay stock suficiente (Out of Stock)', async () => {
    const body = {
      producto_id: 2,
      cliente_id: 1,
      cantidad_solicitada: 9999
    };

    const res = await request(app)
      .post('/order')
      .send(body);

    expect(res.statusCode).toBe(400);
    expect(res.body.description).toBe('Out of Stock');
  });

  it('debería devolver 201, crear el pedido y actualizar el stock correctamente', async () => {
    const pool = getPool();
    const productoId = 3;
    const cantidadComprada = 2;

    const [beforeRows] = await pool.query(
      'SELECT qty FROM productos WHERE id = ?',
      [productoId]
    );
    const stockAntes = beforeRows[0].qty;

    try {
      const res = await request(app)
        .post('/order')
        .send({
          producto_id: productoId,
          cliente_id: 2,
          cantidad_solicitada: cantidadComprada
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.producto_id).toBe(productoId);

      const [afterRows] = await pool.query(
        'SELECT qty FROM productos WHERE id = ?',
        [productoId]
      );

      expect(afterRows[0].qty).toBe(stockAntes - cantidadComprada);
    } finally {
      await pool.query(
        'UPDATE productos SET qty = ? WHERE id = ?',
        [stockAntes, productoId]
      );
    }
  });
});
