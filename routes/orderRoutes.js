const express = require('express');
const router = express.Router();
const orders = require('../data/orders');
const users = require('../data/users');
const products = require('../data/products');

router.get('/', (req, res) => {
  res.json(orders);
});

router.post('/', (req, res) => {
  const { id, userId, productId, quantity, status } = req.body;

  if (!id || !userId || !productId || !quantity || !status) {
    return res.status(400).json({ message: 'Todos los campos deben ser diligenciados' });
  }

  if (typeof id !== 'string' || typeof userId !== 'string' || typeof productId !== 'string' || typeof quantity !== 'string' || typeof status !== 'string') {
    return res.status(400).json({ message: 'Los campos deben ser strings' });
  }

  if (parseInt(quantity) <= 0) {
    return res.status(400).json({ message: "Debe ser mayor a 0" });
  }

  const letterReview = /^[A-Za-z\s]+$/;
  if (!letterReview.test(status)) {
    return res.status(400).json({ message: 'Solo debe contener letras.' });
  }

  const user = users.find(u => u.id === userId);
  const product = products.find(p => p.id === productId);

  if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

  const newOrder = { id, userId, productId, quantity, status };
  orders.push(newOrder);

  res.status(201).json(newOrder);
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Pedido no encontrado' });
  }
});

module.exports = router;