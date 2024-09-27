const express = require('express');
const router = express.Router();
const users = require('../data/users');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  res.json(users);
});

router.post('/', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: 'Faltan datos del usuario' });
  }

  const id = uuidv4();

  const newUser = { id, name, email, age };
  users.push(newUser);
  res.status(201).json(newUser);
});


router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

router.put('/:id', (req, res) => {
  const { name, email, age } = req.body;
  const index = users.findIndex(u => u.id === req.params.id);

  if (index !== -1) {
    const updatedUser = { ...users[index], name, email, age };
    users[index] = updatedUser;
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

module.exports = router;