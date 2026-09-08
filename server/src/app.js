const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Mivel a routes mappa közvetlenül az app.js mellett van az src-ben:
const appointmentRoutes = require('./routes/appointmentRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// API útvonalak bekötése
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
    res.send('Banki api sikeresen fut!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`A szerver fut az ${PORT}-es porton.`);
});