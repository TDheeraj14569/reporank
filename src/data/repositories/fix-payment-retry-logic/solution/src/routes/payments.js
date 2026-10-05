const express = require("express");
const router = express.Router();
const { processPayment } = require("../services/paymentService");

router.post("/", async (req, res) => {
  const result = await processPayment(req.body);
  res.json(result);
});
module.exports = router;
