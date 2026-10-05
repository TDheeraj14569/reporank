const express = require('express');
const app = express();
app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Mouse', category: 'Electronics' },
  { id: 3, name: 'Keyboard', category: 'Electronics' },
  { id: 4, name: 'Desk', category: 'Furniture' },
  { id: 5, name: 'Chair', category: 'Furniture' }
];

app.get('/api/products', (req, res) => {
  const { search, category } = req.query;
  let result = products;

  if (category) {
    result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    result = result.filter(p => {
      const match = p.name.toLowerCase().includes(search.toLowerCase());
      return match;
    });
  }

  res.json(result);
});

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
