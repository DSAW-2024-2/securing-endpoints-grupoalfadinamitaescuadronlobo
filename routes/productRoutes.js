const express = require('express');
const router = express.Router();
const products = require('../data/products');
const { v4: uuidv4 } = require('uuid'); 

router.get('/', (req, res) => {
  res.json(products);
});

  const id = uuidv4();

router.post('/', (req, res) => {
  const { name, price, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Faltan datos del producto' });
  }

  const newProduct = { id: uuidv4(), name, price, category };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

module.exports = router;