const axios = require('axios');
const Reservation = require('../models/Reservation');

const BOOK_SERVICE_URL = 'http://localhost:3001/books';

exports.createReservation = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const { data: livro } = await axios.get(`${BOOK_SERVICE_URL}/${bookId}`);
    if (!livro || livro.status !== 'disponível') {
      return res.status(400).json({ message: 'Livro não disponível para reserva.' });
    }

    const reserva = await Reservation.create({ userId, bookId });

    await axios.patch(`${BOOK_SERVICE_URL}/${bookId}/status`, {
      status: 'reservado'
    });

    res.status(201).json(reserva);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }
    res.status(500).json({ message: 'Erro ao criar reserva.', error: err.message });
  }
};

exports.getReservationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservas = await Reservation.find({ userId });
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar reservas.', error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reservation.findById(id);

    if (!reserva || reserva.status === 'cancelada') {
      return res.status(404).json({ message: 'Reserva não encontrada ou já cancelada.' });
    }

    reserva.status = 'cancelada';
    await reserva.save();

    await axios.patch(`${BOOK_SERVICE_URL}/${reserva.bookId}/status`, {
      status: 'disponível'
    });

    res.json({ message: 'Reserva cancelada com sucesso.' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cancelar reserva.', error: err.message });
  }
};