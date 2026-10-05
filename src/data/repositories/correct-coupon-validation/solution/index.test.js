const request = require('supertest');
const app = require('./index');

describe('POST /api/validate-coupon', () => {
  it('should return 400 for invalid request body', async () => {
    const res = await request(app)
      .post('/api/validate-coupon')
      .send({ code: 'SAVE20' }); // missing purchaseAmount
    expect(res.statusCode).toBe(400);
  });

  it('should return 404 for non-existent coupon', async () => {
    const res = await request(app)
      .post('/api/validate-coupon')
      .send({ code: 'INVALID', purchaseAmount: 150 });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Coupon not found');
  });

  it('should return 400 for expired coupon', async () => {
    const res = await request(app)
      .post('/api/validate-coupon')
      .send({ code: 'EXPIRED10', purchaseAmount: 100 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Coupon is expired');
  });

  it('should return 400 if purchase amount is less than minPurchase', async () => {
    const res = await request(app)
      .post('/api/validate-coupon')
      .send({ code: 'SAVE20', purchaseAmount: 50 });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Minimum purchase amount/);
  });

  it('should apply discount for valid coupon', async () => {
    const res = await request(app)
      .post('/api/validate-coupon')
      .send({ code: 'SAVE20', purchaseAmount: 150 });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.discount).toBe(20);
  });
});
