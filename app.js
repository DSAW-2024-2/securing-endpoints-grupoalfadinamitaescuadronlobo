const express = require('express');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const app = express();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use(express.json());
app.use(session({
  secret: 'clave-secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, 'clave-jwt-secreta', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;
    next();
  });
};
app.use('/users', userRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/orders', authMiddleware, orderRoutes);
app.use((req, res) => {
  res.send('Bienvenido a tu mercado de confianza');
  res.status(404).json({ message: 'Ruta no encontrada' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});