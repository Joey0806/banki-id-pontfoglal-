const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointmentController');


router.post('/', (req, res) => appointmentController.createAppointment(req, res));
router.get('/', (req, res) => appointmentController.getAppointments(req, res));

module.exports = router;