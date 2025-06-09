const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  status: {
    type: String,
    enum: ['disponível', 'reservado'],
    default: 'disponível'
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);