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