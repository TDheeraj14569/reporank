const express = require('express');
const dataController = require('./controllers/dataController');

const router = express.Router();

router.get('/items', dataController.getItems);

module.exports = router;
