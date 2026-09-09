const express = require('express');
const router = express.Router();
// Pontos elérési út a kontrollerhez
const appointmentController = require('../controllers/appointmentController');

// Leképezzük a kéréseket a kontroller osztály metódusaira
router.post('/', (req, res) => appointmentController.createAppointment(req, res));
router.get('/', (req, res) => appointmentController.getAppointments(req, res));

module.exports = router;