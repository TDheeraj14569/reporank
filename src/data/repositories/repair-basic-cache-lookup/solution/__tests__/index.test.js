const request = require('supertest');
const app = require('../index');

describe('Inventory API Cache', () => {
  beforeEach(async () => {
    await request(app).post('/cache/clear');
  });

  it('should fetch from db on first request and cache subsequent requests for positive counts', async () => {
    // First request - not cached
    const res1 = await request(app).get('/inventory/item1');
    expect(res1.status).toBe(200);
    expect(res1.body).toEqual({ itemId: 'item1', count: 10, cached: false });

    // Second request - should be cached
    const res2 = await request(app).get('/inventory/item1');
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual({ itemId: 'item1', count: 10, cached: true });
  });

  it('should correctly cache items with a count of 0', async () => {
    // First request - not cached
    const res1 = await request(app).get('/inventory/item2');
    expect(res1.status).toBe(200);
    expect(res1.body).toEqual({ itemId: 'item2', count: 0, cached: false });

    // Second request - should be cached!
    const res2 = await request(app).get('/inventory/item2');
    expect(res2.status).toBe(200);
    expect(res2.body).toEqual({ itemId: 'item2', count: 0, cached: true });
  });

  it('should return 404 for non-existent items', async () => {
    const res = await request(app).get('/inventory/unknown-item');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Item not found' });
  });
});
