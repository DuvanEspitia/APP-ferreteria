// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/myblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Importa las rutas y configura el middleware
const newsRoutes = require('./routes/newsRoutes');
app.use(express.json());
app.use(newsRoutes);

app.listen(port, () => {
  console.log(`Servidor de backend corriendo en http://localhost:${port}`);
});
