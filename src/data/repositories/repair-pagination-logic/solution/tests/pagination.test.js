const request = require('supertest');
const app = require('../src/index');

describe('Pagination API', () => {
  it('should return the first page correctly', async () => {
    const response = await request(app).get('/api/items?page=1&limit=10');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(10);
    expect(response.body.data[0].id).toBe(1);
    expect(response.body.page).toBe(1);
  });

  it('should return the second page correctly', async () => {
    const response = await request(app).get('/api/items?page=2&limit=10');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(10);
    expect(response.body.data[0].id).toBe(11);
    expect(response.body.page).toBe(2);
  });

  it('should handle default pagination parameters', async () => {
    const response = await request(app).get('/api/items');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(10);
    expect(response.body.data[0].id).toBe(1);
    expect(response.body.limit).toBe(10);
    expect(response.body.page).toBe(1);
  });
  
  it('should calculate total pages correctly', async () => {
    const response = await request(app).get('/api/items?limit=20');
    expect(response.status).toBe(200);
    expect(response.body.totalPages).toBe(6); // 105 items / 20 = 5.25 -> 6
  });
});
