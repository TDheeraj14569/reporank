const request = require('supertest');
const app = require('../src/index');
const products = require('../src/db');

describe('Inventory API', () => {
  beforeEach(() => {
    // Reset DB before each test
    products['prod-1'] = { id: 'prod-1', stock: 10 };
    products['prod-2'] = { id: 'prod-2', stock: 5 };
  });

  test('should successfully reserve stock', async () => {
    const res = await request(app)
      .post('/api/inventory/reserve')
      .send({ productId: 'prod-1', quantity: 2 });
    
    expect(res.statusCode).toBe(200);
    expect(products['prod-1'].stock).toBe(8);
  });

  test('should prevent stock from going below zero on concurrent requests', async () => {
    // prod-2 has 5 in stock. If we send 6 requests of 1 concurrently, 5 should succeed, 1 should fail
    const requests = Array.from({ length: 6 }).map(() =>
      request(app)
        .post('/api/inventory/reserve')
        .send({ productId: 'prod-2', quantity: 1 })
    );

    const responses = await Promise.all(requests);
    
    const successes = responses.filter(r => r.statusCode === 200).length;
    const failures = responses.filter(r => r.statusCode === 400).length;

    expect(products['prod-2'].stock).toBe(0);
    expect(successes).toBe(5);
    expect(failures).toBe(1);
  });
});