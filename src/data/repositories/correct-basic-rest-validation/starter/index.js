const express = require('express');

const app = express();
app.use(express.json());

const items = [];

app.post('/api/items', (req, res) => {
    const { name, category, price, inStock } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing name' });
    }

    if (!category || typeof category !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing category' });
    }

    // BUG: price 0 will evaluate to false and fail validation
    if (!price || typeof price !== 'number' || price < 0) {
        return res.status(400).json({ error: 'Invalid or missing price' });
    }

    // BUG: inStock false will evaluate to false and fail validation
    if (!inStock || typeof inStock !== 'boolean') {
        return res.status(400).json({ error: 'Invalid or missing inStock status' });
    }

    const newItem = { id: items.length + 1, name, category, price, inStock };
    items.push(newItem);

    return res.status(201).json(newItem);
});

app.get('/api/items', (req, res) => {
    res.json(items);
});

module.exports = app;

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}
