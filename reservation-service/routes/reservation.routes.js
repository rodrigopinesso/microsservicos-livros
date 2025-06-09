const express = require('express');
const router = express.Router();
const controller = require('../controllers/reservation.controller');

router.post('/', controller.createReservation);
router.get('/user/:userId', controller.getReservationsByUser);
router.delete('/:id', controller.cancelReservation);

module.exports = router;