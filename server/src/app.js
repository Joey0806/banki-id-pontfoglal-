const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Pontos elérés a te Controllers mappádhoz a képed alapján
const appointmentController = require('./src/controllers/appointmentController');
const app = express();

app.use(cors());
app.use(express.json());

// API végpontok bekötése a kontrollerhez
app.post('/api/appointments', (req, res) => appointmentController.createAppointment(req, res));
app.get('/api/appointments', (req, res) => appointmentController.getAppointments(req, res));

// Alapértelmezett teszt üzenet
app.get('/', (req, res) => {
    res.send('A Banki NoSQL API sikeresen fut.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`A backend szerver fut a ${PORT}-es porton.`));