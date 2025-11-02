const request = require('supertest');
const app = require('../src/app');

describe('GET /product', () => {
  it('debería devolver 200 y una lista de productos disponibles', async () => {
    const res = await request(app).get('/product');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('currentPage', 1);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].producto_estado_id).toBe(3);
  });
});