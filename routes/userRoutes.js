const express = require('express');
const router = express.Router();
const users = require('../data/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  const token = jwt.sign({ id: user.id }, 'clave-jwt-secreta', {
    expiresIn: 86400
  });

  res.status(200).json({ auth: true, token });
});

router.post('/register', (req, res) => {
  const { name, email, password, age } = req.body;

  if (!name || !email || !password || !age) {
    return res.status(400).json({ message: 'Faltan datos del usuario' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword, age };
  users.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;