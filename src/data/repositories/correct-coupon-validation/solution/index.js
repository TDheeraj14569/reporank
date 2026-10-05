const express = require('express');
const app = express();
app.use(express.json());

// Mock database of coupons
const couponsDb = {
  'SAVE20': { discount: 20, minPurchase: 100, expiresAt: new Date(Date.now() + 86400000).toISOString() }, // Expires tomorrow
  'EXPIRED10': { discount: 10, minPurchase: 50, expiresAt: new Date(Date.now() - 86400000).toISOString() } // Expired yesterday
};

const getCouponFromDb = async (code) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(couponsDb[code]);
    }, 50);
  });
};

app.post('/api/validate-coupon', async (req, res) => {
  const { code, purchaseAmount } = req.body;

  if (!code || typeof purchaseAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    // Correctly await the coupon fetch
    const coupon = await getCouponFromDb(code);

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (new Date() > new Date(coupon.expiresAt)) {
      return res.status(400).json({ error: 'Coupon is expired' });
    }

    if (purchaseAmount < coupon.minPurchase) {
      return res.status(400).json({ error: `Minimum purchase amount is ${coupon.minPurchase}` });
    }

    res.json({ success: true, discount: coupon.discount });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;
