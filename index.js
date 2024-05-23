const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let assets = [
  { id: 1, name: 'Laptop', type: 'Electronics', value: 1000 },
  { id: 2, name: 'Chair', type: 'Furniture', value: 150 },

];

// Get all assets
app.get('/api/assets', (req, res) => {
  res.json(assets);
});

// Add a new asset
app.post('/api/assets', (req, res) => {
  const newAsset = { id: assets.length + 1, ...req.body };
  assets.push(newAsset);
  res.status(201).json(newAsset);
});

// Update an asset
app.put('/api/assets/:id', (req, res) => {
  const assetId = parseInt(req.params.id, 10);
  const index = assets.findIndex(a => a.id === assetId);
  if (index !== -1) {
    assets[index] = { id: assetId, ...req.body };
    res.json(assets[index]);
  } else {
    res.status(404).send('Asset not found');
  }
});

// Delete an asset
app.delete('/api/assets/:id', (req, res) => {
  const assetId = parseInt(req.params.id, 10);
  assets = assets.filter(a => a.id !== assetId);
  res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
