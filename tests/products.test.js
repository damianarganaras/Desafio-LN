const request = require('supertest');
const app = require('../src/app');

describe('GET /product', () => {
  it('debería devolver 200 y una lista de productos disponibles', async () => {
    const res = await request(app).get('/product').set('x-api-key', global.apiKey);

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

describe('GET /product/search', () => {
  it('debería devolver 200 y resultados para una búsqueda válida', async () => {
    const res = await request(app).get('/product/search?q=HOLA').set('x-api-key', global.apiKey);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body).toHaveProperty('totalPages');
    expect(res.body).toHaveProperty('total');
    expect(res.body).toHaveProperty('currentPage');
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('debería devolver 200 y un array vacío para una búsqueda sin resultados', async () => {
    const res = await request(app).get('/product/search?q=ESTO-NO-EXISTE').set('x-api-key', global.apiKey);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(0);
    expect(res.body.total).toBe(0);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

describe('GET /product/:slug', () => {
  it('debería devolver 200 y el producto correcto para un slug válido', async () => {
    const res = await request(app).get('/product/hola-argentina-ed.373').set('x-api-key', global.apiKey);

    expect(res.statusCode).toBe(200);
    expect(res.body.product.id).toBe(2);
    expect(res.body.relatedProducts).toBeDefined();
    expect(Array.isArray(res.body.relatedProducts)).toBe(true);
  });

  it('debería devolver 404 para un slug inexistente', async () => {
    const res = await request(app).get('/product/slug-falso-123').set('x-api-key', global.apiKey);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Not Found');
  });
});