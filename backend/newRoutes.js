// backend/routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const News = require('../models/newsModel');

// Obtener todas las noticias
router.get('/api/news', async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar una nueva noticia
router.post('/api/news', async (req, res) => {
  const news = new News({
    title: req.body.title,
    description: req.body.description,
    // Agrega más campos según tus necesidades, como una URL de imagen, etc.
  });

  try {
    const newNews = await news.save();
    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
