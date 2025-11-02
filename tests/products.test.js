const request = require('supertest');
const app = require('../src/app');

describe('GET /product', () => {
  it('debería devolver 200 y una lista de productos disponibles', async () => {
    const res = await request(app).get('/product');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('precio');
    expect(res.body[0].producto_estado_id).toBe(3);
    expect(res.body[0].qty).toBeGreaterThan(0);
  });
});