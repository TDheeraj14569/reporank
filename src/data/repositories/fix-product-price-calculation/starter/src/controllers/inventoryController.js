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