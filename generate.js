const fs = require('fs');
const path = require('path');

const basePath = path.join('c:/Users/dheer/Desktop/New folder (5)/reporank/src/data/repositories/fix-product-price-calculation');

const dirs = [
  path.join(basePath, 'starter', 'src', 'controllers'),
  path.join(basePath, 'starter', 'src', 'services'),
  path.join(basePath, 'starter', 'src', 'routes'),
  path.join(basePath, 'starter', 'tests'),
  path.join(basePath, 'solution', 'src', 'controllers'),
  path.join(basePath, 'solution', 'src', 'services'),
  path.join(basePath, 'solution', 'src', 'routes'),
  path.join(basePath, 'solution', 'tests'),
];

dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

const metadata = {
  buildCmd: "npm install",
  testCmd: "npm test"
};

fs.writeFileSync(path.join(basePath, 'metadata.json'), JSON.stringify(metadata, null, 2));

const packageJson = {
  "name": "inventory-api-3",
  "version": "1.0.0",
  "description": "Warehouse inventory system",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.5.0",
    "supertest": "^6.3.3"
  }
};

fs.writeFileSync(path.join(basePath, 'starter', 'package.json'), JSON.stringify(packageJson, null, 2));
fs.writeFileSync(path.join(basePath, 'solution', 'package.json'), JSON.stringify(packageJson, null, 2));

const indexJs = `
const express = require('express');
const inventoryRoutes = require('./routes/inventory');

const app = express();
app.use(express.json());

app.use('/api/inventory', inventoryRoutes);

if (require.main === module) {
  app.listen(3000, () => console.log('Server running on port 3000'));
}

module.exports = app;
`;

fs.writeFileSync(path.join(basePath, 'starter', 'src', 'index.js'), indexJs.trim());
fs.writeFileSync(path.join(basePath, 'solution', 'src', 'index.js'), indexJs.trim());

const routesJs = `
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/reserve', inventoryController.reserveStock);

module.exports = router;
`;

fs.writeFileSync(path.join(basePath, 'starter', 'src', 'routes', 'inventory.js'), routesJs.trim());
fs.writeFileSync(path.join(basePath, 'solution', 'src', 'routes', 'inventory.js'), routesJs.trim());

const dbJs = `
// In-memory database
const products = {
  'prod-1': { id: 'prod-1', stock: 10 },
  'prod-2': { id: 'prod-2', stock: 5 },
};

module.exports = products;
`;

fs.writeFileSync(path.join(basePath, 'starter', 'src', 'db.js'), dbJs.trim());
fs.writeFileSync(path.join(basePath, 'solution', 'src', 'db.js'), dbJs.trim());

const starterServiceJs = `
const products = require('../db');

class InventoryService {
  async reserveStock(productId, quantity) {
    // BUG: The check and decrement are not atomic, and simulate async delay
    const product = products[productId];
    if (!product) {
      throw new Error('Product not found');
    }

    // Simulate async database read
    await new Promise(resolve => setTimeout(resolve, 50));

    if (product.stock >= quantity) {
      // Simulate async database write
      await new Promise(resolve => setTimeout(resolve, 50));
      product.stock -= quantity;
      return true;
    }
    return false;
  }
}

module.exports = new InventoryService();
`;

const solutionServiceJs = `
const products = require('../db');

class InventoryService {
  constructor() {
    this.locks = {};
  }

  async reserveStock(productId, quantity) {
    // Simple mutex lock per product to fix the race condition
    while (this.locks[productId]) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
    this.locks[productId] = true;

    try {
      const product = products[productId];
      if (!product) {
        throw new Error('Product not found');
      }

      // Simulate async database read
      await new Promise(resolve => setTimeout(resolve, 50));

      if (product.stock >= quantity) {
        // Simulate async database write
        await new Promise(resolve => setTimeout(resolve, 50));
        product.stock -= quantity;
        return true;
      }
      return false;
    } finally {
      this.locks[productId] = false;
    }
  }
}

module.exports = new InventoryService();
`;

fs.writeFileSync(path.join(basePath, 'starter', 'src', 'services', 'inventoryService.js'), starterServiceJs.trim());
fs.writeFileSync(path.join(basePath, 'solution', 'src', 'services', 'inventoryService.js'), solutionServiceJs.trim());

const controllerJs = `
const inventoryService = require('../services/inventoryService');

exports.reserveStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const success = await inventoryService.reserveStock(productId, quantity);
    if (success) {
      res.status(200).json({ message: 'Reservation successful' });
    } else {
      res.status(400).json({ error: 'Insufficient stock' });
    }
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
`;

fs.writeFileSync(path.join(basePath, 'starter', 'src', 'controllers', 'inventoryController.js'), controllerJs.trim());
fs.writeFileSync(path.join(basePath, 'solution', 'src', 'controllers', 'inventoryController.js'), controllerJs.trim());

const testJs = `
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
`;

fs.writeFileSync(path.join(basePath, 'starter', 'tests', 'inventory.test.js'), testJs.trim());
fs.writeFileSync(path.join(basePath, 'solution', 'tests', 'inventory.test.js'), testJs.trim());

console.log("Files created successfully.");
