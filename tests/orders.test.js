const request = require('supertest');
const app = require('../src/app');
const getPool = require('../src/config/database');

describe('POST /order', () => {
  it('debería devolver 400 si faltan datos (DTO)', async () => {
    const res = await request(app)
      .post('/order')
      .set('x-api-key', global.apiKey)
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
      .set('x-api-key', global.apiKey)
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
      .set('x-api-key', global.apiKey)
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
        .set('x-api-key', global.apiKey)
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

describe('GET /order', () => {
  it('debería devolver 200 y pedidos filtrados por CUIT', async () => {
    const res = await request(app)
      .get('/order?cuit=30619823873')
      .set('x-api-key', global.apiKey);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].cuit).toBe('30619823873');
  });

  it('debería devolver 200 y pedidos filtrados por rango de fecha', async () => {
    const res = await request(app)
      .get('/order?created_at_min=2025-01-01&created_at_max=2025-12-31')
      .set('x-api-key', global.apiKey);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('debería devolver 200 y un array vacío si no hay resultados', async () => {
    const res = await request(app)
      .get('/order?cuit=00000000000')
      .set('x-api-key', global.apiKey);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
