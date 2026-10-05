const dataService = require('../services/dataService');

class DataController {
  getItems(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      if (page < 1 || limit < 1) {
        return res.status(400).json({ error: 'Page and limit must be positive integers.' });
      }

      const result = dataService.getItems(page, limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new DataController();
