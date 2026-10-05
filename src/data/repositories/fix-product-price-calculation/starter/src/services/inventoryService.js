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