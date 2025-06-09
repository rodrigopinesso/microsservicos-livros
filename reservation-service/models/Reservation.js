const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  bookId: { type: String, required: true },
  dataReserva: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['ativa', 'cancelada'],
    default: 'ativa'
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema);