const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/reserve', inventoryController.reserveStock);

module.exports = router;