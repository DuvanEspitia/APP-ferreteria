// backend/models/newsModel.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Agrega más campos según tus necesidades, como una URL de imagen, etc.
});

module.exports = mongoose.model('News', newsSchema);
