const express = require('express');
const app = express();

const cache = new Map();

// Mock DB
const inventoryDb = {
  'item1': 10,
  'item2': 0, // Zero inventory item
  'item3': 5
};

const getInventoryFromDb = async (itemId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(inventoryDb[itemId] !== undefined ? inventoryDb[itemId] : null);
    }, 50);
  });
};

app.get('/inventory/:itemId', async (req, res) => {
  const { itemId } = req.params;

  const cachedValue = cache.get(itemId);
  
  // BUG: If cachedValue is 0, it evaluates to false and bypasses the cache
  if (cachedValue) {
    return res.json({ itemId, count: cachedValue, cached: true });
  }

  const count = await getInventoryFromDb(itemId);
  if (count === null) {
    return res.status(404).json({ error: 'Item not found' });
  }

  cache.set(itemId, count);
  return res.json({ itemId, count, cached: false });
});

// Helper for tests to clear cache
app.post('/cache/clear', (req, res) => {
  cache.clear();
  res.json({ success: true });
});

module.exports = app;
