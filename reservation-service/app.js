const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const reservationRoutes = require('./routes/reservation.routes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/reservation_service')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro no MongoDB', err));

app.use('/reservations', reservationRoutes);

module.exports = app;