const request = require('supertest');
const app = require('./index');

describe('GET /api/products', () => {
  it('should return all products when no filters are applied', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(5);
  });

  it('should filter products by category', async () => {
    const res = await request(app).get('/api/products?category=Furniture');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].name).toBe('Desk');
  });

  it('should filter products by search term', async () => {
    const res = await request(app).get('/api/products?search=lap');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Laptop');
  });

  it('should filter products by category and search term', async () => {
    const res = await request(app).get('/api/products?category=Electronics&search=mouse');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Mouse');
  });

  it('should return empty array if no products match', async () => {
    const res = await request(app).get('/api/products?search=television');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});
