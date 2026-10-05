const request = require('supertest');
const app = require('./index');

describe('POST /api/items', () => {
    it('should create an item successfully with valid positive price and inStock true', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({
                name: 'Test Item',
                category: 'Electronics',
                price: 99.99,
                inStock: true
            });
        
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Test Item');
        expect(response.body.price).toBe(99.99);
        expect(response.body.inStock).toBe(true);
    });

    it('should return 400 for missing name', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({
                category: 'Electronics',
                price: 99.99,
                inStock: true
            });
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid or missing name');
    });

    it('should create an item with price 0 (free item)', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({
                name: 'Free Item',
                category: 'Promotions',
                price: 0,
                inStock: true
            });
        
        expect(response.status).toBe(201);
        expect(response.body.price).toBe(0);
    });

    it('should create an item with inStock as false', async () => {
        const response = await request(app)
            .post('/api/items')
            .send({
                name: 'Out of Stock Item',
                category: 'Electronics',
                price: 100,
                inStock: false
            });
        
        expect(response.status).toBe(201);
        expect(response.body.inStock).toBe(false);
    });
});
